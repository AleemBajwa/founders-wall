import { NextResponse, connection } from "next/server";
import { getAllSlotsAuthoritative } from "@/lib/serverStorage";

export async function GET() {
  await connection();
  try {
    const inventory = await getAllSlotsAuthoritative();
    return NextResponse.json(inventory, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch authoritative slots" },
      { status: 500 }
    );
  }
}
