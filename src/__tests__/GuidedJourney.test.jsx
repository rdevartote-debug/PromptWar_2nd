import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GuidedJourney from "../components/GuidedJourney";
import { LanguageProvider } from "../LanguageContext";

function renderWithLang(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe("GuidedJourney Component", () => {
  it("renders the journey title", () => {
    renderWithLang(<GuidedJourney />);
    expect(screen.getByText("Your Election Journey")).toBeInTheDocument();
  });

  it("starts on step 1", () => {
    renderWithLang(<GuidedJourney />);
    expect(screen.getByText(/Step 1 of 7/)).toBeInTheDocument();
  });

  it("navigates to the next step when Next is clicked", () => {
    renderWithLang(<GuidedJourney />);
    const nextBtn = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Step 2 of 7/)).toBeInTheDocument();
  });

  it("disables Previous on the first step", () => {
    renderWithLang(<GuidedJourney />);
    const prevBtn = screen.getByRole("button", { name: /Previous/i });
    expect(prevBtn).toBeDisabled();
  });

  it("navigates backward correctly", () => {
    renderWithLang(<GuidedJourney />);
    const nextBtn = screen.getByRole("button", { name: /Next/i });
    const prevBtn = screen.getByRole("button", { name: /Previous/i });
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
    expect(screen.getByText(/Step 2 of 7/)).toBeInTheDocument();
  });
});
