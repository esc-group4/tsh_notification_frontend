import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import getRecentUser from '../getUser.js';
import registerUser from '../decideUser.js';

// Mock the getRecentUser and registerUser modules
jest.mock('../getUser.js');
jest.mock('../decideUser.js');

describe('App Component', () => {
  test('updates tempUserName on input change', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });
    expect(inputElement.value).toBe('John Doe');
  });

  test('registers user and shows success message', async () => {
    // Mock registerUser function to resolve successfully
    registerUser.mockResolvedValue('User Registered');

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    const registerButton = screen.getByText(/click to register user/i);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/user is registered successfully!/i)).toBeInTheDocument();
    });
  });

  test('shows error message if registration fails', async () => {
    // Mock registerUser function to reject with an error
    registerUser.mockRejectedValue(new Error('Registration failed'));

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    const registerButton = screen.getByText(/click to register user/i);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/error registering user/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays recent user id when "View your user id" button is clicked', async () => {
    // Mock registerUser and getRecentUser functions
    registerUser.mockResolvedValue('User Registered');
    getRecentUser.mockResolvedValue('12345');

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    const registerButton = screen.getByText(/click to register user/i);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/user is registered successfully!/i)).toBeInTheDocument();
    });

    const viewUserIdButton = screen.getByText(/view your user id/i);
    fireEvent.click(viewUserIdButton);

    await waitFor(() => {
      expect(screen.getByText(/john doe's subscription id: 12345/i)).toBeInTheDocument();
    });
  });
});