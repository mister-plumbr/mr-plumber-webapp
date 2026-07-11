import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Plumber } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const auth = await getAuthUser();

    if (!auth || (auth.role !== "OPERATIONS" && auth.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plumbers = await Plumber.find({ isVerified: true })
      .select(
        "id name phone rating jobsCompleted initials location isAvailable"
      )
      .sort({ rating: -1 });

    return NextResponse.json({ plumbers });
  } catch (error) {
    console.error("Get plumbers error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
