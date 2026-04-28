import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders the header correctly", () => {
    render(<App />);
    expect(screen.getByText(/IndiaVoteAssist/i)).toBeInTheDocument();
  });

  it("renders the hero section correctly", () => {
    render(<App />);
    expect(
      screen.getByText(/Making a Difference|Your First Election|Future Voter/i),
    ).toBeInTheDocument();
  });
});
