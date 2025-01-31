import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId, userId, canEdit } = await req.json();

    if (!noteId || !userId) {
      return NextResponse.json(
        { error: "Note ID and User ID are required" },
        { status: 400 }
      );
    }

    const existingNote = await prisma.note.findUnique({
      where: { id: noteId },
    });

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 400 }
      );
    }

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    const ownerId = existingNote?.ownerId;

    if (ownerId === userId) {
      return NextResponse.json(
        { error: "You can't share a note with yourself" },
        { status: 400 }
      );
    }

    const existingSharedNote = await prisma.sharedNote.findUnique({
      where: {
        noteId_userId: {
          noteId,
          userId,
        },
      },
    });

    if (existingSharedNote) {
      return NextResponse.json(
        { error: "Note is already shared with this user" },
        { status: 400 }
      );
    }

    const sharedNote = await prisma.sharedNote.create({
      data: {
        noteId,
        userId,
        canEdit,
      },
    });

    return NextResponse.json({
      status: "success",
      data: sharedNote,
    });
  } catch (error) {
    console.error("Create shared note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}