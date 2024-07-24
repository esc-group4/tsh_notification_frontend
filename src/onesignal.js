// import OneSignal from 'react-onesignal';

// export default async function runOneSignal() {
//   try {
//     await OneSignal.init({
//       // appId: "39dc6c84-8625-4449-bfd2-db8c9b58e9f0",
//       // safari_web_id: "web.onesignal.auto.2d55a779-27e1-4bb7-a896-7e19803bedb7",
//       appId: "4b7035fa-afda-4657-ab5f-033b8408a9a1",
//       safari_web_id: "web.onesignal.auto.1150f274-be67-4412-813c-e6f1ba6adf3e",
//       allowLocalhostAsSecureOrigin: true,
//       notifyButton: {
//         enable: true,
//       },
//       serviceWorkerParam: { scope: "/OneSignalSDK-v16-ServiceWorker/" },
//       serviceWorkerPath: "../OneSignalSDK-v16-ServiceWorker/OneSignalSDKWorker.js",
//     });
    
//   } catch (error) {
//     console.error('Error initializing OneSignal:', error);
//   }
// }

// Not recommended to uninitialize SDK worker even if user unsubscribes

// export async function uninitializeOneSignal() {
//   if ('serviceWorker' in navigator) {
//     try {
//       const registrations = await navigator.serviceWorker.getRegistrations();
//       for (let registration of registrations) {
//         if (registration.scope.includes('OneSignalSDK-v16-ServiceWorker')) {
//           await registration.unregister();
//           console.log('Service worker unregistered:', registration);
//         }
//       }
//     } catch (error) {
//       console.error('Error unregistering service worker:', error);
//     }
//   } else {
//     console.log('Service workers are not supported in this browser.');
//   }
// }