import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

/**
 * A component that simply throws an error for testing purposes.
 */
const ThrowError = () => {
  throw new Error("Test Error");
};

describe("ErrorBoundary Component", () => {
  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Healthy Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId("child")).toBeDefined();
    expect(screen.getByText("Healthy Child")).toBeDefined();
  });

  it("renders fallback UI when an error is caught", () => {
    // Suppress console.error for this test as the error is expected
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/Something went wrong/i)).toBeDefined();
    expect(screen.getByText(/refreshing the page/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Refresh Page/i })).toBeDefined();
    
    consoleSpy.mockRestore();
  });
});
