import React from 'react';
import { render, act } from '@testing-library/react';
import RecentUser from '../components/RecentUser';

jest.useFakeTimers();

describe('RecentUser Component', () => {
  it('renders user information when userName and subscriptionToken are provided', () => {
    const userName = 'John Doe';
    const subscriptionToken = '12345';
    const { getByText } = render(
      <RecentUser 
        userName={userName} 
        subscriptionToken={subscriptionToken} 
        clearRecentUser={() => {}}
      />
    );
    expect(getByText(`${userName}'s Subscription id: ${subscriptionToken}`)).toBeInTheDocument();
  });

  it('does not render when userName or subscriptionToken is missing', () => {
    const { container: container1 } = render(
      <RecentUser userName="John Doe" clearRecentUser={() => {}} />
    );
    expect(container1.firstChild).toBeNull();

    const { container: container2 } = render(
      <RecentUser subscriptionToken="12345" clearRecentUser={() => {}} />
    );
    expect(container2.firstChild).toBeNull();
  });

  it('calls clearRecentUser after 5 seconds', () => {
    const clearRecentUser = jest.fn();
    render(
      <RecentUser 
        userName="John Doe" 
        subscriptionToken="12345" 
        clearRecentUser={clearRecentUser}
      />
    );

    expect(clearRecentUser).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(clearRecentUser).toHaveBeenCalledTimes(1);
  });
});