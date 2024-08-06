import React, { useEffect } from 'react';
import './RecentUser.css'

function RecentUser({ userName, subscriptionToken, clearRecentUser }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearRecentUser();
    }, 5000);

    return () => clearTimeout(timer); // Clear timeout if the component unmounts or dependencies change
  }, [userName, subscriptionToken, clearRecentUser]);

  return (
    userName && subscriptionToken && (
      <div className="recent-user">
        <p>{userName}'s Subscription id: {subscriptionToken}</p>
      </div>
    )
  );
}

export default RecentUser;
