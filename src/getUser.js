import axios from 'axios';

const API_KEY = "MDk4MzUyNjctZTA2NC00MzBiLTlmOTctNWM2NTNlMmU0Yzk0";
const ONE_SIGNAL_APP_ID = "ec153c30-9c70-43c2-b87d-1a842135970a";
const BASE_URL = "https://onesignal.com/api/v1";

export default async function getUsersByTag(tagValue) {
  try {
    const response = await axios.get(`${BASE_URL}/players`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${API_KEY}`,
      },
      params: {
        app_id: ONE_SIGNAL_APP_ID,
        tags: `employee=${tagValue}`,
      }
    });
    return response.data.players;
  } catch (error) {
    console.error('Error fetching users by tag:', error.response ? error.response.data : error.message);
    return [];
  }
}