import OneSignal from "react-onesignal";
import axios from "axios";
import getUsersByTag from "./getUser";
import runOneSignal from "./onesignal";

const API_KEY = "MDk4MzUyNjctZTA2NC00MzBiLTlmOTctNWM2NTNlMmU0Yzk0";
const ONE_SIGNAL_APP_ID = "ec153c30-9c70-43c2-b87d-1a842135970a";

function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    if (/windows phone/i.test(userAgent)) {
      return 4; // Windows Phone
    }
  
    if (/android/i.test(userAgent)) {
      return 2; // Android
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 1; // iOS
    }
  
    if (/Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor)) {
      return 6; // Chrome Website Push Notifications
    }
  
    // Default to Web Push Notifications if unknown
    return 12;
  }

export async function registerUser(name) {
    try {
        const deviceType = getDeviceType();
        // Format user registration payload
        const registrationPayload = {
            app_id: ONE_SIGNAL_APP_ID,
            identifier: 'USER_EMAIL_OR_ID',
            device_type: deviceType,
            tags: { employee: name },
        };
  
      // Send registration using Axios
      const response = await axios.post('https://onesignal.com/api/v1/players', registrationPayload, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${API_KEY}`,
        },
      });
      console.log('User registered :D', response.data);
      // Need to intialise SDK worker after user correctly added!
      runOneSignal();
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
  }

  export async function unregisterUser(name) {
    try {
        // Get users by tag
        const users = await getUsersByTag(name);
        if (users.length === 0) {
            console.log('No users found with the given tag.');
            return;
        }

        // Extract the identifier (player ID) from the first user found
        const user = users[0];
        const identifier = user.id; // Adjust based on actual structure

        console.log(`Attempting to unregister user with identifier: ${identifier}`);

        // Send request to delete the user using Axios
        const response = await axios.delete(`https://onesignal.com/api/v1/players/${identifier}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${API_KEY}`,
            },
            params: {
              app_id: ONE_SIGNAL_APP_ID,
            }
        });
        console.log('User unregistered successfully :D', response.data);
    } catch (error) {
        // Log the full error response for debugging
        console.error('Error unregistering user:', error.response ? error.response.data : error.message);
    }
}