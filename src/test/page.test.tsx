import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

test("Page renders correctly", () => {
  render(<Page />);
  expect(screen.getByRole("main")).toBeDefined();
});

test("Page contains TodoList component", () => {
  render(<Page />);
  // Check if the main container is present
  const mainElement = screen.getByRole("main");
  expect(mainElement).toHaveClass("min-h-screen", "bg-gray-100", "py-8");
});
