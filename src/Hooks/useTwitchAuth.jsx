import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

export function useTwitchAuth() {
  const { authToken, setAuthToken, appAccessToken, setAppAccessToken, authUser, setAuthUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [expiresIn, setExpiresIn] = useState(null);
  const [initialized, setInitialized] = useState(false); // Ajouter une variable d'état pour indiquer si le composant est initialisé ou non

  const redirectToTwitchAuth = () => {
    const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=token&scope=${import.meta.env.VITE_SCOPE}`;
    window.location.href = twitchAuthUrl;
  };

  useEffect(() => {
    // Parse the hash fragment in the URL
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    // Set token in context
    if (hash.access_token) {
      setAuthToken(hash.access_token);
      setExpiresIn(Number(hash.expires_in) * 1000); // Convert expiresIn to milliseconds
    } else {
      console.log('Access token not found in hash');
    }
    setInitialized(true); // Marquer le composant comme initialisé ici
  }, []); // Empty dependency array to trigger this useEffect only once on initial load

  useEffect(() => {
    // Set expiresIn in state
    fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&grant_type=client_credentials`
    })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          setAppAccessToken(data.access_token);
          setExpiresIn(Number(data.expires_in) * 1000); // Convert expiresIn to milliseconds
        } else {
          console.error('Failed to get app access token');
        }
        setIsLoading(false); // Move setIsLoading(false) here, after token retrieval
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // Move setIsLoading(false) here, in case of error
      });
  }, []);

  useEffect(() => {
    // ...

    // Refresh the token before it expires
    const refreshIntervalId = setInterval(() => {
      fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&grant_type=client_credentials`
      })
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            setAppAccessToken(data.access_token);
            setExpiresIn(Number(data.expires_in) * 1000); // Convert expiresIn to milliseconds
          } else {
            console.error('Failed to refresh app access token');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, expiresIn - 60000); // Refresh token 1 minute before it expires

    return () => {
      clearInterval(refreshIntervalId); // Clear the interval when the component is unmounted
    };
  }, [expiresIn, initialized]); // Déclencher le troisième useEffect à chaque changement de expiresIn et initialized


  useEffect(() => {
    if (authToken) {
      fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Client-ID': import.meta.env.VITE_CLIENT_ID
        }
      })
        .then(response => response.json())
        .then(data => {
          setAuthUser(data.data[0]); // Set user data here
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [authToken]); // Trigger this effect whenever authToken changes


  if (isLoading) {
    return { isLoading };
  }

  return { authToken, redirectToTwitchAuth, appAccessToken, setAppAccessToken, isLoading, authUser };
}
