import { NextRequest, NextResponse } from "next/server";
import { claimSlotAuthoritative, deleteClaimAuthoritative } from "@/lib/serverStorage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, targetSlotId } = body;

    if (!formData) {
      return NextResponse.json(
        { error: "Form data is required to claim a position." },
        { status: 400 }
      );
    }

    const result = await claimSlotAuthoritative(formData, targetSlotId);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    const message = error?.message || "Failed to process claim submission.";
    const status =
      message.includes("already been claimed") || message.includes("cannot be claimed")
        ? 409
        : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret") || req.headers.get("x-admin-secret");

    const ADMIN_SECRET = process.env.ADMIN_SECRET || "fw_genesis_reset_2026";
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slotIdParam = searchParams.get("slotId");
    const slotId = slotIdParam ? parseInt(slotIdParam, 10) : undefined;

    const result = await deleteClaimAuthoritative(slotId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete claim" },
      { status: 500 }
    );
  }
}
