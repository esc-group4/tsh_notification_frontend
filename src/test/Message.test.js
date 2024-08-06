import React from 'react';
import { render, act } from '@testing-library/react';
import Message from '../components/Message';

jest.useFakeTimers();

describe('Message Component', () => {
  it('renders message when provided', () => {
    const message = 'Test message';
    const { getByText } = render(<Message message={message} clearMessage={() => {}} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it('does not render when message is empty', () => {
    const { container } = render(<Message message="" clearMessage={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls clearMessage after 5 seconds', () => {
    const clearMessage = jest.fn();
    render(<Message message="Test message" clearMessage={clearMessage} />);

    expect(clearMessage).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(clearMessage).toHaveBeenCalledTimes(1);
  });

  it('clears timeout on unmount', () => {
    const clearMessage = jest.fn();
    const { unmount } = render(<Message message="Test message" clearMessage={clearMessage} />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(clearMessage).not.toHaveBeenCalled();
  });
});