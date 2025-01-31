import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { sharedID: string } }) {
  const { sharedID } = params;

  try {
    if (!sharedID) {
      return NextResponse.json(
        { error: "Shared ID is required" },
        { status: 400 }
      );
    }

    const existingSharedNote = await prisma.sharedNote.findUnique({
      where: { id: sharedID },
    });

    if (!existingSharedNote) {
      return NextResponse.json(
        { error: "Shared note not found" },
        { status: 400 }
      );
    }

    const { canEdit } = await request.json();

    if (canEdit === undefined) {
      return NextResponse.json(
        { error: "Can Edit is required" },
        { status: 400 }
      );
    }

    const updatedSharedNote = await prisma.sharedNote.update({
      where: { id: sharedID },
      data: { canEdit },
    });

    return NextResponse.json({
      status: "success",
      data: updatedSharedNote
    });
  } catch (error) {
    console.error("Update shared note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { sharedID: string } }) {
  const { sharedID } = params;

  try {
    if (!sharedID) {
      return NextResponse.json(
        { error: "Shared ID is required" },
        { status: 400 }
      );
    }

    const existingSharedNote = await prisma.sharedNote.findUnique({
      where: { id: sharedID },
    });

    if (!existingSharedNote) {
      return NextResponse.json(
        { error: "Shared note not found" },
        { status: 400 }
      );
    }

    await prisma.sharedNote.delete({
      where: { id: sharedID },
    });

    return NextResponse.json({
      status: "success",
      message: `Shared Note ${sharedID} deleted`,
    });

  } catch (error) {
    console.error("Delete shared note error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}