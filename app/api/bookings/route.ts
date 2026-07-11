import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { createBookingSchema } from "@/lib/validation";

export async function GET() {
  try {
    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const where =
      auth.role === "CUSTOMER" ? { userId: auth.userId } : undefined;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: {
          select: { firstName: true, lastName: true, phone: true, email: true },
        },
        plumber: {
          select: {
            id: true,
            name: true,
            phone: true,
            rating: true,
            jobsCompleted: true,
            initials: true,
            location: true,
          },
        },
        estimate: true,
        invoice: true,
        review: true,
        notes: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
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
    const auth = await getAuthUser();

    // Allow unauthenticated uploads for MVP, but attach to demo user if not logged in
    let userId = auth?.userId;

    if (!userId) {
      const demoUser = await prisma.user.findUnique({
        where: { email: "rahul@example.com" },
      });
      userId = demoUser?.id;
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

    const booking = await prisma.booking.create({
      data: {
        title,
        category,
        description,
        address,
        landmark,
        isEmergency,
        preferredTime: preferredTime ? new Date(preferredTime) : null,
        userId,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
