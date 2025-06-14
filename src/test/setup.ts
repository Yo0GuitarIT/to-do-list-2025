import "@testing-library/jest-dom";
import { vi } from "vitest";
import { configure } from "@testing-library/react";

// Configure testing library to auto-cleanup and reduce act warnings
configure({
  testIdAttribute: "data-testid",
});

// Mock fetch for testing
global.fetch = vi.fn();

// Mock Next.js router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: "/",
  }),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: "/",
  }),
  usePathname: () => "/",
}));
