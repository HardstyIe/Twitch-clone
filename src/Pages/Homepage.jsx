import { useEffect, useState } from "react";
import RightsideHomepage from "../Components/RighsideHomepage";
import Sidebar from "../Components/Sidebar";


const Homepage = () => {
  const [data, setData] = useState(null);

  const redirectToTwitchAuth = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const scope = encodeURIComponent(import.meta.env.VITE_SCOPE);
    window.location = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=c3ab8aa609ea11e793ae92361f002671`;
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    fetch('https://api.twitch.tv/helix/', {
      method: 'GET',
      headers: {
        'Client-ID': import.meta.env.VITE_CLIENT_ID,
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


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

    // Set token
    if (hash.access_token) {
      localStorage.setItem("authToken", hash.access_token);
      console.log('Token:', localStorage.getItem("authToken")); // Debug log to inspect token
    } else {
      console.log('Access token not found in hash'); // Debug log if access token not found
    }
  }, []);


  return (
    <div className={"w-full flex"}>
      <div className={"w-1/5"}>
        <button onClick={redirectToTwitchAuth}>Se connecter avec Twitch</button>
        <Sidebar />
      </div>
      <div className={"w-4/5"}>
        <RightsideHomepage />
        {data ? JSON.stringify(data) : 'Loading...'}
      </div>
    </div>
  );
};

export default Homepage;
