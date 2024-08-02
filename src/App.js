import React, { useState, useEffect } from 'react';
import './App.css';
import registerUser from './decideUser.js';
import Button from './Button.js';

function App() {
  const [userName, setUserName] = useState('');
  const [tempUserName, setTempUserName] = useState('');
  const [showRecentUser, setShowRecentUser] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [message, setMessage] = useState(''); // Message after registration
  const [subscriptionToken, setSubscriptionToken] = useState(''); // track subscription token

  // Ensure OneSignal SDK is initialized before using its functions
  useEffect(() => {
    // Ensure OneSignal SDK is initialized before using its functions
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(function(OneSignal) {

      function pushSubscriptionChangeListener(event) {
        if (event.current.token) {
          setSubscriptionToken(OneSignal.User.PushSubscription.id);
          console.log("User's subscription id is:", OneSignal.User.PushSubscription.id);
        }
      }

      OneSignal.User.PushSubscription.addEventListener("change", pushSubscriptionChangeListener);

      return () => {
        OneSignal.User.PushSubscription.removeEventListener("change", pushSubscriptionChangeListener);
      };
    });
  }, []);


  const handleInputChange = (e) => {
    setTempUserName(e.target.value); // Update temporary state on input change
  };

  const handleGetUsers = async () => {
    if (isRegistered) {
      setShowRecentUser(true); // Show the recent user ID after fetching
    } else {
      console.log("User not registered yet.");
    }
  };


  // FIX CONCURRENCY ISSUE!!!! user actually needs to click notification bell FIRST before this.
  const handleRegisterUser = async () => {
    try {
      const value = await registerUser(tempUserName.trim(), subscriptionToken); // Register the user
      if ( value === null ) {
        setMessage('Error registering user.');
      }
      else {
        setUserName(value); // Update userName with the temporary input value
        setIsRegistered(true); // Mark as registered
        setMessage('User is registered successfully!'); // Set registration message
      }
    } catch (error) {
      setMessage('Error registering user.'); // Set error message if registration fails
    }
  };

  return (
    <div className="container">
      <header className="instructions">
        <h1>Please click the notification bell! Register your name afterwards.</h1>
      </header>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Enter your name to register" 
          value={tempUserName} 
          onChange={handleInputChange} 
          className="input-box"
        />
      </div>
      <div className="button-container">
        <Button onClick={handleRegisterUser}>Click to register User</Button>
        <Button onClick={handleGetUsers}>View your user id</Button>
      </div>
      {message && (
        <div className="registration-message">
          <p>{message}</p>
        </div>
      )}
      {showRecentUser && (
        <div className="recent-user">
          <p>{userName}'s Subscription id: {subscriptionToken}</p>
        </div>
      )}
    </div>
  );
}

export default App;