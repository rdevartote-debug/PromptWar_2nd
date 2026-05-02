import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders the header correctly", () => {
    render(<App />);
    expect(screen.getByText((content, element) => element.textContent === "IndiaVoteAssist")).toBeDefined();
  });

  it("renders the hero section correctly (async)", async () => {
    render(<App />);
    // Since Hero is inside Suspense, we use findBy to wait for lazy loading
    const elements = await screen.findAllByText(/Making a Difference|Your First Election|Future Voter/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it("renders the language selector", () => {
    render(<App />);
    expect(screen.getByLabelText(/Select Language/i)).toBeDefined();
  });
});
