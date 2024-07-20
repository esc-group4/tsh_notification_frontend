import OneSignal from 'react-onesignal';
// npm install axios
import axios from 'axios';

// This will simply show the notification bell so that users can subscribe/unsubscribe
const API_KEY = "MDk4MzUyNjctZTA2NC00MzBiLTlmOTctNWM2NTNlMmU0Yzk0";
const ONE_SIGNAL_APP_ID = "ec153c30-9c70-43c2-b87d-1a842135970a";

export default async function runOneSignal() {
  try {
    OneSignal.init({
      appId: "ec153c30-9c70-43c2-b87d-1a842135970a",
      safari_web_id: "web.onesignal.auto.2d1085e1-a560-4918-b950-42f254dd8495",
      allowLocalhostAsSecureOrigin: true,
      // notifyButton: {
      //   enable: true,
      // },
      serviceWorkerParam: { scope: "/OneSignalSDK-v16-ServiceWorker/" },
      serviceWorkerPath: "../OneSignalSDK-v16-ServiceWorker/OneSignalSDKWorker.js",
    });
  } catch (error) {
    console.error('Error initializing OneSignal:', error);
  }
}
