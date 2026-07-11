import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

const invoiceSchema = z.object({
  labour: z.number().int().min(0),
  travel: z.number().int().min(0),
  parts: z.array(z.object({ name: z.string().min(1), cost: z.number().int().min(0) })),
  taxPercent: z.number().min(0).max(100).default(18),
});

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const auth = await getAuthUser();

    if (!auth || auth.role !== "PLUMBER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = invoiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { labour, travel, parts, taxPercent } = parsed.data;
    const partsTotal = parts.reduce((sum, p) => sum + p.cost, 0);
    const subtotal = labour + travel + partsTotal;
    const tax = Math.round(subtotal * (taxPercent / 100));
    const total = subtotal + tax;

    const invoice = await prisma.invoice.upsert({
      where: { bookingId: id },
      update: {
        labour,
        travel,
        parts: JSON.stringify(parts),
        tax,
        total,
      },
      create: {
        bookingId: id,
        labour,
        travel,
        parts: JSON.stringify(parts),
        tax,
        total,
      },
    });

    await prisma.booking.update({
      where: { id },
      data: { status: "PAYMENT_PENDING" },
    });

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error("Invoice error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
