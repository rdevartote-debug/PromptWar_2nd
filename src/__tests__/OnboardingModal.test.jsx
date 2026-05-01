import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OnboardingModal from "../components/OnboardingModal";

describe("OnboardingModal Validation", () => {
  it("renders the first step asking for age", () => {
    render(<OnboardingModal onComplete={() => {}} />);
    expect(screen.getByText(/How old are you/i)).toBeInTheDocument();
  });

  it("does not advance without selecting an age", () => {
    render(<OnboardingModal onComplete={() => {}} />);
    // The state selection should not be visible until age is selected
    expect(screen.queryByText(/Select your state/i)).not.toBeInTheDocument();
  });

  it("advances to state step after selecting age", () => {
    render(<OnboardingModal onComplete={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /Over 21/i }));
    expect(screen.getByLabelText(/Select your state/i)).toBeInTheDocument();
  });

  it("completes the full flow with over21 age group", async () => {
    const onComplete = vi.fn();
    render(<OnboardingModal onComplete={onComplete} />);

    fireEvent.click(screen.getByRole("button", { name: /Over 21/i }));
    fireEvent.change(screen.getByLabelText(/Select your state/i), {
      target: { value: "Delhi" },
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Yes, I have it/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Yes, I have it/i }));
    fireEvent.click(screen.getByRole("button", { name: /Go to Dashboard/i }));

    expect(onComplete).toHaveBeenCalledWith({
      age: "over21",
      state: "Delhi",
      hasVoterId: true,
    });
  });
});
