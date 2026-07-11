import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking, User } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";
import { createBookingSchema } from "@/lib/validation";
import crypto from "crypto";

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

export async function GET() {
  try {
    await connectToDatabase();
    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let query = {};
    if (auth.role === "CUSTOMER") {
      query = { userId: auth.userId };
    } else if (auth.role === "PLUMBER") {
      query = { plumberId: auth.userId };
    }

    const bookings = await Booking.find(query)
      .populate("userId", "firstName lastName phone email")
      .populate("plumberId", "name phone rating jobsCompleted initials location")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings: bookings.map(transformBooking) });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const auth = await getAuthUser();

    let userId = auth?.userId;

    if (!userId) {
      const demoUser = await User.findOne({ email: "rahul@example.com" });
      userId = demoUser?._id.toString();
    }

    if (!userId) {
      return NextResponse.json(
        { error: "No user available" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = createBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      title,
      category,
      description,
      address,
      landmark,
      isEmergency,
      preferredTime,
    } = parsed.data;

    const booking = await Booking.create({
      requestId: `MP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      title,
      category,
      description,
      address,
      landmark,
      isEmergency,
      preferredTime: preferredTime ? new Date(preferredTime) : null,
      userId,
    });

    return NextResponse.json({ booking: transformBooking(booking) }, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
