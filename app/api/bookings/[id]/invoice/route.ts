import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models";

function transformBooking(booking: any) {
  const obj = booking.toObject ? booking.toObject() : booking;
  return {
    ...obj,
    id: obj._id.toString(),
    userId: obj.userId?._id?.toString() || obj.userId?.toString(),
    plumberId: obj.plumberId?._id?.toString() || obj.plumberId?.toString(),
    user: obj.userId && typeof obj.userId === "object"
      ? {
          id: obj.userId._id?.toString(),
          firstName: obj.userId.firstName,
          lastName: obj.userId.lastName,
          phone: obj.userId.phone,
          email: obj.userId.email,
        }
      : undefined,
    plumber: obj.plumberId && typeof obj.plumberId === "object"
      ? {
          id: obj.plumberId._id?.toString(),
          name: obj.plumberId.name,
          phone: obj.plumberId.phone,
          rating: obj.plumberId.rating,
          jobsCompleted: obj.plumberId.jobsCompleted,
          initials: obj.plumberId.initials,
          location: obj.plumberId.location,
        }
      : undefined,
  };
}
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
    await connectToDatabase();
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

    const booking = await Booking.findOneAndUpdate(
      { requestId: id },
      {
        status: "PAYMENT_PENDING",
        invoice: {
          labour,
          travel,
          parts,
          tax,
          total,
          isPaid: false,
        },
      },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await booking.populate("userId", "firstName lastName phone email");
    await booking.populate("plumberId", "name phone rating jobsCompleted initials location");

    return NextResponse.json({ invoice: booking.invoice, booking: transformBooking(booking) });
  } catch (error) {
    console.error("Invoice error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
