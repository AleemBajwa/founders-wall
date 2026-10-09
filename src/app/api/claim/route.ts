import { NextRequest, NextResponse } from "next/server";
import { claimSlotAuthoritative } from "@/lib/serverStorage";

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
