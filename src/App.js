import runOneSignal from './onesignal.js';
import React, { useState } from 'react';
import { registerUser } from './decideUser.js';
import {unregisterUser} from './decideUser.js';
import getUsersByTag from './getUser.js'; 
import Button from './Button.js';

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

  const handleUnregisterUser = () => {
    unregisterUser(userName);
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
      <Button onClick={handleRegisterUser}>Register User</Button>
      <Button onClick={handleGetUsers}>View users in console</Button>
      <Button onClick={handleUnregisterUser}>Unregister User</Button>
    </div>
  );
}

export default App;