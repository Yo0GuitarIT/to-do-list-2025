import { expect, test, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock Prisma
const mockTodos = [
  {
    id: 1,
    title: "測試待辦事項",
    completed: false,
    createdAt: "2025-06-14T00:00:00.000Z",
    updatedAt: "2025-06-14T00:00:00.000Z",
  },
];

const mockPrisma = {
  todo: {
    findMany: vi.fn(),
    create: vi.fn(),
  },
};

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("GET /api/todos returns todos", async () => {
  // Mock the prisma call
  mockPrisma.todo.findMany.mockResolvedValue(mockTodos);

  // Import after mock is set up
  const { GET } = await import("../../app/api/todos/route");

  const response = await GET();
  const data = await response.json();

  expect(mockPrisma.todo.findMany).toHaveBeenCalledWith({
    orderBy: {
      createdAt: "desc",
    },
  });
  expect(data).toEqual(mockTodos);
  expect(response.status).toBe(200);
});

test("POST /api/todos creates new todo", async () => {
  const newTodo = {
    id: 1,
    title: "新待辦事項",
    completed: false,
    createdAt: "2025-06-14T00:00:00.000Z",
    updatedAt: "2025-06-14T00:00:00.000Z",
  };

  mockPrisma.todo.create.mockResolvedValue(newTodo);

  const { POST } = await import("../../app/api/todos/route");

  const request = new NextRequest("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({ text: "新待辦事項" }),
  });

  const response = await POST(request);
  const data = await response.json();

  expect(mockPrisma.todo.create).toHaveBeenCalledWith({
    data: { title: "新待辦事項" },
  });
  expect(data).toEqual(newTodo);
  expect(response.status).toBe(200);
});

test("GET /api/todos handles database error", async () => {
  mockPrisma.todo.findMany.mockRejectedValue(new Error("Database error"));

  const { GET } = await import("../../app/api/todos/route");

  const response = await GET();
  const data = await response.json();

  expect(response.status).toBe(500);
  expect(data.error).toContain("Failed to fetch todos");
});

test("POST /api/todos handles database error", async () => {
  mockPrisma.todo.create.mockRejectedValue(new Error("Database error"));

  const { POST } = await import("../../app/api/todos/route");

  const request = new NextRequest("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({ text: "新待辦事項" }),
  });

  const response = await POST(request);
  const data = await response.json();

  expect(response.status).toBe(500);
  expect(data.error).toContain("Failed to create todo");
});
