import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const auth = await getAuthUser();

    if (!auth || (auth.role !== "OPERATIONS" && auth.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plumbers = await prisma.plumber.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        name: true,
        phone: true,
        rating: true,
        jobsCompleted: true,
        initials: true,
        location: true,
        isAvailable: true,
      },
      orderBy: { rating: "desc" },
    });

    return NextResponse.json({ plumbers });
  } catch (error) {
    console.error("Get plumbers error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
