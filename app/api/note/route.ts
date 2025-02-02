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
    const recent = searchParams.get('recent');
    const privacy = searchParams.get('privacy');
    const position = searchParams.get('position');

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    let whereClause: any = {
      OR: [
        { ownerId: userId },
        { SharedNote: { some: { userId } } },
      ],
    };

    if (privacy) {
      switch (privacy) {
        case 'public':
          whereClause.isPrivate = false;
          break;
        case 'private':
          whereClause.isPrivate = true;
          break;
        default:
          return NextResponse.json(
            { error: "Invalid privacy filter" },
            { status: 400 }
          );
      }
    }

    if (position) {
      switch (position) {
        case 'owner':
          whereClause.ownerId = userId;
          break;
        case 'shared':
          whereClause.SharedNote = { some: { userId } };
          break;
        default:
          return NextResponse.json(
            { error: "Invalid position filter" },
            { status: 400 }
          );
      }
    }

    if (recent) {
      const notes = await prisma.note.findMany({
        where: { ...whereClause, ownerId: userId },
        orderBy: { updatedAt: "desc" },
        take: 3,
      });

      if (notes.length == 0) {
        return NextResponse.json(
          { error: "No notes found" },
          { status: 400 }
        );
      }

      return NextResponse.json(notes);
    }

    const notes = await prisma.note.findMany({
      where: whereClause,
      include: { SharedNote: true, owner: true, updatedBy: true },
      orderBy: { updatedAt: "desc" },
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