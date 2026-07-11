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
import { updateStatusSchema } from "@/lib/validation";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { status } = parsed.data;

    const booking = await Booking.findOne({ requestId: id });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (auth.role === "CUSTOMER" && booking.userId.toString() !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (auth.role === "PLUMBER" && booking.plumberId?.toString() !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    booking.status = status;
    await booking.save();

    await booking.populate("userId", "firstName lastName phone email");
    await booking.populate("plumberId", "name phone rating jobsCompleted initials location");

    return NextResponse.json({ booking: transformBooking(booking) });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
