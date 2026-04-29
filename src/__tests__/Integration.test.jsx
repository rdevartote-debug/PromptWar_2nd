import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OnboardingModal from '../components/OnboardingModal';

describe('OnboardingModal Integration', () => {
  it('completes the onboarding flow and calls onComplete with correct profile', async () => {
    const handleComplete = vi.fn();
    render(<OnboardingModal onComplete={handleComplete} />);

    // Step 1: Age
    const ageButton = screen.getByRole('button', { name: /18-21/i });
    fireEvent.click(ageButton);

    // Step 2: State
    const stateSelect = screen.getByLabelText(/Select your state/i);
    fireEvent.change(stateSelect, { target: { value: 'Maharashtra' } });
    
    // Wait for step 3 to appear because of setTimeout(..., 300) in step 2
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Yes, I have it/i })).toBeInTheDocument();
    });
    
    // Step 3: Voter ID
    const hasIdButton = screen.getByRole('button', { name: /Yes, I have it/i });
    fireEvent.click(hasIdButton);

    // Step 4: Submit
    const submitButton = screen.getByRole('button', { name: /Go to Dashboard/i });
    fireEvent.click(submitButton);

    expect(handleComplete).toHaveBeenCalledWith({
      age: '18-21',
      state: 'Maharashtra',
      hasVoterId: true
    });
  });
});
