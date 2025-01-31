import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content, isPrivate, userId } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    if (isPrivate === undefined) {
      return NextResponse.json(
        { error: "Visibility is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        ownerId: userId,
        updatedById: userId,
        isPrivate,
      },
    });

    return NextResponse.json({
      status: "success",
      data: note,
    });
  } catch (error) {
    console.error("Create note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const notes = await prisma.note.findMany({
      where: { ownerId: userId },
    });

    if (notes.length == 0) {
      return NextResponse.json(
        { error: "No notes found" },
        { status: 400 }
      );
    }

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Get notes error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}