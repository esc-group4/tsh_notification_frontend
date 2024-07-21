import axios from 'axios';

const API_KEY = "MDk4MzUyNjctZTA2NC00MzBiLTlmOTctNWM2NTNlMmU0Yzk0";
const ONE_SIGNAL_APP_ID = "ec153c30-9c70-43c2-b87d-1a842135970a";
const BASE_URL = "https://onesignal.com/api/v1";

export default async function getUsersByTag(tagValue) {
    let allPlayers = [];
    let offset = 0;
    const limit = 50; // Maximum allowed by OneSignal API
  
    try {
      // While loop ensures that we can fetch as many players as we want regardless of limit and concat all the players
      while (true) {
        const response = await axios.get(`${BASE_URL}/players`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${API_KEY}`,
          },
          params: {
            app_id: ONE_SIGNAL_APP_ID,
            limit: limit,
            offset: offset,
          }
        });
  
        const players = response.data.players;
        if (players.length === 0) {
          // No more players to fetch
          break;
        }
  
        allPlayers = allPlayers.concat(players);
        offset += limit;
      }
  
      // Filter players by tag
      const filteredPlayers = allPlayers.filter(player => {
        return player.tags && player.tags["employee"] === tagValue;
      });
  
      // Return player IDs
      return filteredPlayers.map(player => player.id);
  
    } catch (error) {
      console.error('Error fetching players:', error.response ? error.response.data : error.message);
      throw error;
    }
  }