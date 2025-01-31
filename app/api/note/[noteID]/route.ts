import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { noteID: string } }) {
  const { noteID } = params;

  try {
    if (!noteID) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    const existingNote = await prisma.note.findUnique({
      where: { id: noteID },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 400 }
      );
    }

    const { title, content, updatedIdUser, isPrivate } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    };

    if (isPrivate === undefined) {
      return NextResponse.json(
        { error: "Visibility is required" },
        { status: 400 }
      );
    };

    if (!updatedIdUser) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: updatedIdUser },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteID },
      data: {
        title,
        content,
        updatedById: updatedIdUser,
        isPrivate,
      },
    });

    return NextResponse.json({
      status: "success",
      data: updatedNote,
    });


  } catch (error) {
    console.error("Update note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { noteID: string } }) {
  const { noteID } = params;

  try {
    if (!noteID) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    const existingNote = await prisma.note.findUnique({
      where: { id: noteID },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 400 }
      );
    }

    await prisma.note.delete({
      where: { id: noteID },
    });

    return NextResponse.json({
      status: "success",
      message: `Note ${noteID} deleted`,
    });

  } catch (error) {
    console.error("Delete note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: { params: { noteID: string } }) {
  const { noteID } = params;

  try {
    if (!noteID) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    const note = await prisma.note.findUnique({
      where: { id: noteID },
    });

    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: note,
    });
  } catch (error) {
    console.error("Get note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}