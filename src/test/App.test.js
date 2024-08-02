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
    await waitFor(() => expect(screen.getByText('Error registering user.')).toBeInTheDocument());
    
  });

  it('does not show user id if not registered', () => {
    render(<App />);
    fireEvent.click(screen.getByText('View your user id'));
    expect(screen.queryByText(/Subscription id:/i)).not.toBeInTheDocument();
  });
});


// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import App from '../App';
// import getRecentUser from '../getUser.js';
// import registerUser from '../decideUser.js';

// // Mock the getRecentUser and registerUser modules
// jest.mock('../getUser.js');
// jest.mock('../decideUser.js');

// describe('App Component', () => {
//   test('updates tempUserName on input change', () => {
//     render(<App />);
//     const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
//     fireEvent.change(inputElement, { target: { value: 'John Doe' } });
//     expect(inputElement.value).toBe('John Doe');
//   });

//   test('registers user and shows success message', async () => {
//     // Mock registerUser function to resolve successfully
//     registerUser.mockResolvedValue('User Registered');

//     render(<App />);
//     const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
//     fireEvent.change(inputElement, { target: { value: 'John Doe' } });

//     const registerButton = screen.getByText(/click to register user/i);
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(screen.getByText(/user is registered successfully!/i)).toBeInTheDocument();
//     });
//   });

//   test('shows error message if registration fails', async () => {
//     // Mock registerUser function to reject with an error
//     registerUser.mockRejectedValue(new Error('Registration failed'));

//     render(<App />);
//     const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
//     fireEvent.change(inputElement, { target: { value: 'John Doe' } });

//     const registerButton = screen.getByText(/click to register user/i);
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(screen.getByText(/error registering user/i)).toBeInTheDocument();
//     });
//   });

//   test('fetches and displays recent user id when "View your user id" button is clicked', async () => {
//     // Mock registerUser and getRecentUser functions
//     registerUser.mockResolvedValue('User Registered');
//     getRecentUser.mockResolvedValue('12345');

//     render(<App />);
//     const inputElement = screen.getByPlaceholderText(/enter your name to register/i);
//     fireEvent.change(inputElement, { target: { value: 'John Doe' } });

//     const registerButton = screen.getByText(/click to register user/i);
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(screen.getByText(/user is registered successfully!/i)).toBeInTheDocument();
//     });

//     const viewUserIdButton = screen.getByText(/view your user id/i);
//     fireEvent.click(viewUserIdButton);

//     await waitFor(() => {
//       expect(screen.getByText(/john doe's subscription id: 12345/i)).toBeInTheDocument();
//     });
//   });
// });