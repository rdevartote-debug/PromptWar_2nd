import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TermDictionary from "../components/TermDictionary";

describe("TermDictionary Component", () => {
  it("renders all ELI15 terms", () => {
    render(<TermDictionary />);
    expect(screen.getAllByText(/EVM \(Electronic Voting Machine\)/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/VVPAT/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Constituency/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/NOTA/).length).toBeGreaterThan(0);
  });

  it("switches the active term when a different term button is clicked", () => {
    render(<TermDictionary />);
    const notaBtn = screen.getByRole("button", { name: /NOTA/ });
    fireEvent.click(notaBtn);
    expect(notaBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("displays the explanation for the active term", () => {
    render(<TermDictionary />);
    expect(screen.getByText(/super-secure calculator/)).toBeInTheDocument();
  });
});
