import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken, setAuthCookie } from "@/lib/auth";
import { z } from "zod";

const plumberLoginSchema = z.object({
  phone: z.string().min(10),
  pin: z.string().min(4),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = plumberLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { phone, pin } = parsed.data;

    const plumber = await prisma.plumber.findUnique({
      where: { phone },
    });

    if (!plumber) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(pin, plumber.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: plumber.id,
      email: plumber.email,
      role: "PLUMBER",
    });

    await setAuthCookie(token);

    return NextResponse.json({
      plumber: {
        id: plumber.id,
        name: plumber.name,
        phone: plumber.phone,
        rating: plumber.rating,
        jobsCompleted: plumber.jobsCompleted,
        initials: plumber.initials,
        location: plumber.location,
      },
      token,
    });
  } catch (error) {
    console.error("Plumber login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
