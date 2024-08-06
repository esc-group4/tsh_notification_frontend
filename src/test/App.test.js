import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App.js';
import registerUser from '../decideUser.js';

// Mock the registerUser function
jest.mock('../decideUser.js', () => jest.fn());

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    registerUser.mockReset();

    // Mock OneSignal setup
    window.OneSignalDeferred = [];
    window.OneSignal = {
      Notifications: {
        setDefaultUrl: jest.fn(),
      },
      User: {
        PushSubscription: {
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          id: 'mock-subscription-id',
        },
      },
    };

    // Mock the subscription change listener
    window.OneSignalDeferred.push = jest.fn((fn) => {
      fn(window.OneSignal);
    });
  });

  it('renders the input, buttons, and header', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter your name to register')).toBeInTheDocument();
    expect(screen.getByText('Click to register User')).toBeInTheDocument();
    expect(screen.getByText('View your user id')).toBeInTheDocument();
    expect(screen.getByText('Please click the notification bell! Register your name afterwards.')).toBeInTheDocument();
  });

  it('registers the user and shows the subscription id', async () => {
    registerUser.mockResolvedValue('testuser');

    render(<App />);

    // Call the subscription change event listener directly
    const eventListener = window.OneSignal.User.PushSubscription.addEventListener.mock.calls[0][1];
    eventListener({ current: { token: 'mock-subscription-id' } });

    fireEvent.change(screen.getByPlaceholderText('Enter your name to register'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Click to register User'));

    await waitFor(() => expect(registerUser).toHaveBeenCalledWith('testuser', 'mock-subscription-id'));

    await waitFor(() => expect(screen.getByText('User is registered successfully!')).toBeInTheDocument());

    fireEvent.click(screen.getByText('View your user id'));

    expect(screen.getByText(/testuser's Subscription id: mock-subscription-id/i)).toBeInTheDocument();
  });

  it('handles registration errors', async () => {
    registerUser.mockRejectedValue(new Error('Registration failed'));

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name to register'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Click to register User'));

    await waitFor(() => expect(registerUser).toHaveBeenCalledWith('testuser', ''));

    // Can use text matching function to get exact match, as text might be split up in the document
    await waitFor(() => expect(screen.getByText('Error registering user. Click the notification bell and try again.')).toBeInTheDocument());
    
  });

  it('does not show user id if not registered', () => {
    render(<App />);
    fireEvent.click(screen.getByText('View your user id'));
    expect(screen.queryByText(/Subscription id:/i)).not.toBeInTheDocument();
  });
});