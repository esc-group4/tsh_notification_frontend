export default async function getRecentUser() {
  try {
    const response = await fetch('http://localhost:3001/get/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.recent;
  } catch (error) {
    console.error('Error fetching recent user:', error);
    return null;
  }
};
  
// export async function getUsersByTag(tagValue) {
//     let allPlayers = [];
//     let offset = 0;
//     const limit = 50; // Maximum allowed by OneSignal API
  
//     try {
//       // While loop ensures that we can fetch as many players as we want regardless of limit and concat all the players
//       while (true) {
//         const response = await axios.get(`${BASE_URL}/players`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Basic ${API_KEY}`,
//           },
//           params: {
//             app_id: ONE_SIGNAL_APP_ID,
//             limit: limit,
//             offset: offset,
//           }
//         });
  
//         const players = response.data.players;
//         if (players.length === 0) {
//           // No more players to fetch
//           break;
//         }
  
//         allPlayers = allPlayers.concat(players);
//         offset += limit;
//       }
  
//       // Filter players by tag
//       const filteredPlayers = allPlayers.filter(player => {
//         return player.tags && player.tags["employee"] === tagValue;
//       });
  
//       // Return player IDs
//       return filteredPlayers.map(player => player.id);
  
//     } catch (error) {
//       console.error('Error fetching players:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   }

// export async function getRecentUser() {
//   try {
//         const response = await axios.get(`https://onesignal.com/api/v1/players?app_id=${ONE_SIGNAL_APP_ID}`, {
//             headers: {
//                 'Authorization': `Basic ${API_KEY}`,
//                 'Content-Type': 'application/json; charset=utf-8'
//             }
//         });

//         const length = response.data.players.length;
//         return response.data.players[length-1].id;
//     } catch (error) {
//         console.error('Error fetching recent subscriptions:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };
