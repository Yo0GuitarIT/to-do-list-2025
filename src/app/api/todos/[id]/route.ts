import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await request.json();
    const todo = await prisma.todo.update({
      where: { id: parseInt(params.id) },
      data: { completed },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update todo: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete todo: ${error}` },
      { status: 500 }
    );
  }
}
