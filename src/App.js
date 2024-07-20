import runOneSignal from './onesignal.js';
import React, { useState } from 'react';
import registerUser from './registerUser.js';
import getUsersByTag from './getUser.js'; 

function App() {
  const [userName, setUserName] = useState('');
  const [findName, setFindName] = useState('');

  const handleGetUsers = () => {
    getUsersByTag(findName).then(users => {
      console.log(`Users with employee = ${findName}:`, users);
    });
  };


  const handleRegisterUser = () => {
    registerUser(userName);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter your name to register" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter the name of employee you want to find" 
        value={findName} 
        onChange={(e) => setFindName(e.target.value)} 
      />
      <button onClick={runOneSignal}>Initialize OneSignal</button>
      <button onClick={handleRegisterUser}>Register User</button>
      <button onClick={handleGetUsers}>View users in console</button>
    </div>
  );
}

export default App;