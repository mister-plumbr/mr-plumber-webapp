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
import { estimateSchema } from "@/lib/validation";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
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

    const booking = await Booking.findOneAndUpdate(
      { requestId: id },
      {
        status: "ESTIMATE_GENERATED",
        estimate: {
          labour,
          travel,
          parts,
          min,
          max,
          notes,
          expiresAt,
        },
      },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await booking.populate("userId", "firstName lastName phone email");
    await booking.populate("plumberId", "name phone rating jobsCompleted initials location");

    return NextResponse.json({ estimate: booking.estimate, booking: transformBooking(booking) });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
