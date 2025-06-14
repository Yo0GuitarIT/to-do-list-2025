import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { completed } = await request.json();
    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete todo: ${error}` },
      { status: 500 }
    );
  }
}
