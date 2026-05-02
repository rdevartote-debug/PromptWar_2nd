import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import VoterPledge from "./VoterPledge";
import toast from "react-hot-toast";

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

describe("VoterPledge Component", () => {
  it("renders the pledge form initially", () => {
    render(<VoterPledge />);
    expect(screen.getByText(/The Voter's Pledge/i)).toBeDefined();
    expect(screen.getByLabelText(/Sign with your full name/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Take the Pledge/i })).toBeDefined();
  });

  it("shows error toast if name is empty", () => {
    render(<VoterPledge />);
    
    const submitButton = screen.getByRole("button", { name: /Take the Pledge/i });
    fireEvent.click(submitButton);
    
    expect(toast.error).toHaveBeenCalledWith("Please enter your name to take the pledge.");
  });

  it("transitions to success state on valid submission", () => {
    render(<VoterPledge />);
    
    const input = screen.getByLabelText(/Sign with your full name/i);
    fireEvent.change(input, { target: { value: "John Doe" } });
    
    const submitButton = screen.getByRole("button", { name: /Take the Pledge/i });
    fireEvent.click(submitButton);
    
    expect(toast.success).toHaveBeenCalled();
    expect(screen.getByText(/Pledge Honored!/i)).toBeDefined();
    expect(screen.getByText(/John Doe/i)).toBeDefined();
  });
});
