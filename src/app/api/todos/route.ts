import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch todos: ${error}` },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { text } = await request.json();
    const todo = await prisma.todo.create({
      data: { title: text },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create todo: ${error}` },
      { status: 500 }
    );
  }
};
