import { useEffect, useState } from "react";
import RightsideHomepage from "../Components/HomePageRight/RightsideHomepage";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useTwitchAuth } from '../Hooks/useTwitchAuth';
import { useTwitchData } from '../Hooks/useTwitchData';
import { useUserData } from '../Hooks/useUserData';


const Homepage = () => {
  const { authToken, redirectToTwitchAuth, appAccessToken, authUser } = useTwitchAuth();
  const { fetchTwitchData, fetchPublicTwitchData } = useTwitchData()
  const { fetchUserData } = useUserData()
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([])
  const [userLogin, setUserLogin] = useState()
  const [limit, setLimit] = useState(12)
  const [user_id, setUser_id] = useState()
  const [streamerInfo, setStreamerInfo] = useState([])
  const [first, setFirst] = useState(
    `first=${limit}`)

  useEffect(() => {
    if (authToken) {
      fetchTwitchData(`streams/followed?${first}&user_id=${authUser.id}`)
        .then(data => {
          setData(data.data);
          setUserLogin(data.data.map(stream => stream.user_name)); // Récupérer tous les noms d'utilisateur
          setStreamerInfo(data.data.map(stream => ({ username: stream.user_name, game: stream.game_name }))); // Stocker les informations des streamers
        });
    } else if (appAccessToken) {
      fetchPublicTwitchData(`streams?${first}`)
        .then(data => {
          setData(data.data);
          setUserLogin(data.data.map(stream => stream.user_name)); // Récupérer tous les noms d'utilisateur
          setStreamerInfo(data.data.map(stream => ({ username: stream.user_name, game: stream.game_name }))); // Stocker les informations des streamers
        });
    }
  }, [authToken, first]);

  useEffect(() => {
    if (userLogin && Array.isArray(userLogin)) {
      Promise.all(userLogin.map(login => fetchUserData(`users?login=${login}`)))
        .then(dataArray => {
          setUserData(dataArray);
        });
    }
  }, [userLogin]);

  useEffect(() => {
    setFirst(`first=${limit}`)
  }, [limit])


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 overflow-auto">
        <Sidebar stream={data} limit={limit} setLimit={setLimit} />
      </div>

      <div className="flex-grow overflow-auto">
        <RightsideHomepage data={data} userData={userData} setLimit={setLimit} streamerInfo={streamerInfo} />
      </div>
    </div>

  );
};

export default Homepage;
