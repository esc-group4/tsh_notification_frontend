// import axios from 'axios';
// import { getUsersByTag } from './getUser';

// const API_KEY = "MmE3NDY2ZWQtYmMxZi00ZDczLWIxYTYtNDQ2YjVkZmE2OTEx";
// const ONE_SIGNAL_APP_ID = "4b7035fa-afda-4657-ab5f-033b8408a9a1";
// const API_KEY = "ODk5NDUzNjUtMzBkZS00ZTNiLWE3YWUtMWY5M2JhNWRiN2Iy";
// const ONE_SIGNAL_APP_ID = "39dc6c84-8625-4449-bfd2-db8c9b58e9f0";

export default async function registerUser(name) {
    if ( name.length === 0 ) {
        return null;
    }
    return name;
};

//   export async function unregisterUser(name) {
//     try {
//         // Get users by tag
//         const id = await getUsersByTag(name);
//         if (id.length === 0) {
//             console.log('No users found with the given name.');
//             return;
//         }

//         console.log(`Attempting to unregister user with identifier: ${id}`);

//         // Send request to delete the user using Axios
//         const response = await axios.delete(`https://onesignal.com/api/v1/players/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json; charset=utf-8',
//                 'Authorization': `Basic ${API_KEY}`,
//             },
//             params: {
//               app_id: ONE_SIGNAL_APP_ID,
//             }
//         });
//         console.log('User unregistered successfully :D', response.data);
//     } catch (error) {
//         // Log the full error response for debugging
//         console.error('Error unregistering user:', error.response ? error.response.data : error.message);
//     }
// }