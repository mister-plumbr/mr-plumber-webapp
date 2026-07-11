import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User, Plumber } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (auth.role === "PLUMBER") {
      const plumber = await Plumber.findById(auth.userId);

      if (!plumber) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        user: {
          id: plumber._id.toString(),
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

    const user = await User.findById(auth.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
