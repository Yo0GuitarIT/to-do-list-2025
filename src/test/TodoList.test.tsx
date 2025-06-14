import { expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoList from "../components/TodoList";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockTodos = [
  {
    id: 1,
    title: "測試待辦事項 1",
    completed: false,
    createdAt: "2025-06-14T00:00:00.000Z",
    updatedAt: "2025-06-14T00:00:00.000Z",
  },
  {
    id: 2,
    title: "測試待辦事項 2",
    completed: true,
    createdAt: "2025-06-14T00:00:00.000Z",
    updatedAt: "2025-06-14T00:00:00.000Z",
  },
];

beforeEach(() => {
  mockFetch.mockClear();
});

test("renders loading state initially", () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  } as Response);

  render(<TodoList />);
  expect(screen.getByText("載入中...")).toBeDefined();
});

test("renders todo list after loading", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  } as Response);

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("Todo List")).toBeDefined();
  });

  expect(screen.getByText("測試待辦事項 1")).toBeDefined();
  expect(screen.getByText("測試待辦事項 2")).toBeDefined();
});

test("renders empty state when no todos", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  } as Response);

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("還沒有待辦事項，來新增一個吧！")).toBeDefined();
  });
});

test("can add new todo", async () => {
  // Mock initial fetch
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  } as Response);

  // Mock POST request
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      id: 3,
      title: "新的待辦事項",
      completed: false,
      createdAt: "2025-06-14T00:00:00.000Z",
      updatedAt: "2025-06-14T00:00:00.000Z",
    }),
  } as Response);

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByPlaceholderText("新增待辦事項...")).toBeDefined();
  });

  const input = screen.getByPlaceholderText("新增待辦事項...");
  const addButton = screen.getByText("新增");

  fireEvent.change(input, { target: { value: "新的待辦事項" } });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "新的待辦事項" }),
    });
  });
});

test("can toggle todo completion", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  } as Response);

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ ...mockTodos[0], completed: true }),
  } as Response);

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("測試待辦事項 1")).toBeDefined();
  });

  const checkbox = screen.getAllByRole("checkbox")[0];
  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith("/api/todos/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    });
  });
});

test("can delete todo", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  } as Response);

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }),
  } as Response);

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("測試待辦事項 1")).toBeDefined();
  });

  const deleteButton = screen.getAllByText("刪除")[0];
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith("/api/todos/1", {
      method: "DELETE",
    });
  });
});
