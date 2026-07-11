import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { estimateSchema } from "@/lib/validation";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const auth = await getAuthUser();

    if (!auth || auth.role !== "OPERATIONS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = estimateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { labour, travel, parts, notes, bufferPercent } = parsed.data;
    const partsTotal = parts.reduce((sum, p) => sum + p.cost, 0);
    const baseTotal = labour + travel + partsTotal;
    const min = Math.round(baseTotal);
    const max = Math.round(baseTotal * (1 + bufferPercent / 100));

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const estimate = await prisma.estimate.upsert({
      where: { bookingId: id },
      update: {
        labour,
        travel,
        parts: JSON.stringify(parts),
        min,
        max,
        notes,
        expiresAt,
      },
      create: {
        bookingId: id,
        labour,
        travel,
        parts: JSON.stringify(parts),
        min,
        max,
        notes,
        expiresAt,
      },
    });

    await prisma.booking.update({
      where: { id },
      data: { status: "ESTIMATE_GENERATED" },
    });

    return NextResponse.json({ estimate });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
