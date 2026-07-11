import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { assignPlumberSchema } from "@/lib/validation";

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
    const parsed = assignPlumberSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { plumberId } = parsed.data;

    const plumber = await prisma.plumber.findUnique({
      where: { id: plumberId },
    });

    if (!plumber) {
      return NextResponse.json(
        { error: "Plumber not found" },
        { status: 404 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        plumberId,
        status: "PLUMBER_ASSIGNED",
      },
      include: { plumber: true },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Assign plumber error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
