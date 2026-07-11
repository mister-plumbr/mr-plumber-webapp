import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (auth.role === "PLUMBER") {
      const plumber = await prisma.plumber.findUnique({
        where: { id: auth.userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          rating: true,
          jobsCompleted: true,
          initials: true,
          location: true,
        },
      });

      if (!plumber) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        user: {
          id: plumber.id,
          email: plumber.email,
          firstName: plumber.name.split(" ")[0],
          lastName: plumber.name.split(" ").slice(1).join(" ") || "",
          role: "PLUMBER",
          phone: plumber.phone,
          rating: plumber.rating,
          jobsCompleted: plumber.jobsCompleted,
          initials: plumber.initials,
          location: plumber.location,
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
