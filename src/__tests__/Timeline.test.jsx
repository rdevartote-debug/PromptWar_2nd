import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Timeline from "../components/Timeline";

describe("Timeline Component", () => {
  it("renders all 5 election phases", () => {
    render(<Timeline />);
    expect(screen.getByText("Announcement of Elections")).toBeInTheDocument();
    expect(screen.getByText("Nomination Filing")).toBeInTheDocument();
    expect(screen.getByText("Campaign Period")).toBeInTheDocument();
    expect(screen.getByText("Polling Dates")).toBeInTheDocument();
    expect(screen.getByText("Counting & Results")).toBeInTheDocument();
  });

  it("renders state-specific dates when userProfile has a state", () => {
    render(<Timeline userProfile={{ state: "Maharashtra", age: "18-21" }} />);
    expect(screen.getByText(/March 15, 2026/)).toBeInTheDocument();
  });

  it("renders generic phase labels when no state is selected", () => {
    render(<Timeline />);
    const phases = screen.getAllByText(/Phase/);
    expect(phases.length).toBeGreaterThan(0);
  });
});
