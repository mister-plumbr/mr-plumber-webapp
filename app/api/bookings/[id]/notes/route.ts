import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

const noteSchema = z.object({
  content: z.string().min(1),
});

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const auth = await getAuthUser();

    if (!auth || (auth.role !== "OPERATIONS" && auth.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = noteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: {
        bookingId: id,
        content: parsed.data.content,
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Create note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
