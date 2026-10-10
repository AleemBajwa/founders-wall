import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAllSlotsAuthoritative } from "@/lib/serverStorage";
import { getSlotPrice } from "@/utils/pricing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, targetSlotId } = body;

    if (!formData || !formData.projectName || !formData.projectUrl) {
      return NextResponse.json(
        { error: "Valid project name and URL are required." },
        { status: 400 }
      );
    }

    const inventory = await getAllSlotsAuthoritative();
    if (inventory.isSoldOut || inventory.nextSlotId === null) {
      return NextResponse.json(
        { error: "The Founders Wall is completely filled." },
        { status: 400 }
      );
    }

    const slotId = targetSlotId ?? inventory.nextSlotId;
    if (slotId !== inventory.nextSlotId) {
      return NextResponse.json(
        { error: `Slot #${slotId} is no longer the active slot. Next available is #${inventory.nextSlotId}.` },
        { status: 409 }
      );
    }

    const price = getSlotPrice(slotId);

    // If Genesis Free tier ($0.00), tell frontend to use direct claim
    if (price === 0) {
      return NextResponse.json({ isFree: true, slotId });
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe payment gateway is not initialized on the server." },
        { status: 500 }
      );
    }

    // Determine return base URL
    const origin =
      req.headers.get("origin") ||
      req.headers.get("referer") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://founders-wall.vercel.app";

    const cleanOrigin = origin.replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `The 500 Founders Wall — Slot #${slotId.toString().padStart(3, "0")}`,
              description: `Permanent archival placement for "${formData.projectName}" (${formData.category})`,
              images:
                formData.logoUrl && formData.logoUrl.startsWith("http")
                  ? [formData.logoUrl]
                  : ["https://founders-wall.vercel.app/logo.png"],
            },
            unit_amount: price * 100, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        slotId: slotId.toString(),
        projectName: formData.projectName.slice(0, 50),
        founderName: formData.founderName.slice(0, 50),
        founderHandle: (formData.founderHandle || "").slice(0, 50),
        projectUrl: formData.projectUrl.slice(0, 200),
        category: formData.category,
        oneLiner: formData.oneLiner.slice(0, 140),
        logoUrl: formData.logoUrl.slice(0, 500),
      },
      success_url: `${cleanOrigin}/?session_id={CHECKOUT_SESSION_ID}&slot_minted=${slotId}`,
      cancel_url: `${cleanOrigin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
