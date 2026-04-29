import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatAssistant from '../components/ChatAssistant';

// Mock the genai module
vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    constructor() {
      this.chats = {
        create: () => ({
          sendMessage: async () => {
            throw new Error('500 Internal Server Error');
          }
        })
      };
    }
  }
}));

describe('ChatAssistant API Error Handling', () => {
  beforeEach(() => {
    // Clear localStorage to ensure fresh state
    localStorage.clear();
    // Stub the environment variable
    vi.stubEnv('VITE_GEMINI_API_KEY', 'AIza_mock_test_key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('falls back to offline knowledge base when API throws an error', async () => {
    render(<ChatAssistant />);

    // Initially, it might show "AI-Powered Assistant" if the API key is present
    await waitFor(() => {
      expect(screen.getByText('AI-Powered Assistant')).toBeInTheDocument();
    });

    // Find the chat input
    const input = screen.getByPlaceholderText(/E.g., What is the/i);
    const sendButton = screen.getByLabelText('Send message');

    // Type a message that maps to an offline response
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    fireEvent.click(sendButton);

    // We expect an error to be thrown and caught. The UI should display the offline fallback message for voting.
    await waitFor(() => {
      // The text "Here's how to vote in India:" should be present
      expect(screen.getByText(/Here's how to vote in India/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Check if it downgraded to offline status
    expect(screen.getByText('Election Knowledge Base')).toBeInTheDocument();
  });
});
