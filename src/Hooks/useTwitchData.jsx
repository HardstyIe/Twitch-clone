import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';


export function useTwitchData() {
  const { authToken, appAccessToken } = useContext(AuthContext);

  function fetchTwitchData(endpoint, method = 'GET', body) {
    const headers = {
      "Client-ID": import.meta.env.VITE_CLIENT_ID,
      'Content-Type': 'application/json'
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }


    return fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  function fetchPublicTwitchData(endpoint, method = 'GET', body) {
    const headers = {
      "Client-ID": import.meta.env.VITE_CLIENT_ID,
      'Content-Type': 'application/json'
    };

    if (appAccessToken) {
      headers['Authorization'] = `Bearer ${appAccessToken}`;
    }

    return fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return { fetchTwitchData, fetchPublicTwitchData };
}
