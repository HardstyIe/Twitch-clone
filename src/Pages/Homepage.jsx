import { useEffect, useState } from "react";
import RightsideHomepage from "../Components/RighsideHomepage";
import Sidebar from "../Components/Sidebar";
import { useTwitchAuth } from '../Hooks/useTwitchAuth';
import { useTwitchData } from '../Hooks/useTwitchData';


const Homepage = () => {
  const { authToken, redirectToTwitchAuth, appAccessToken } = useTwitchAuth();
  const { fetchTwitchData, fetchPublicTwitchData } = useTwitchData()
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(12)
  const [user_id, setUser_id] = useState()
  const [first, setFirst] = useState(
    `first=${limit}`)
  useEffect(() => {
    if (authToken) {
      fetchTwitchData(`streams/followed?${first}&user_id=94739531`)
        .then(data => {
          setData(data.data);
        });
    } else if (appAccessToken) {
      fetchPublicTwitchData(`streams?${first}`)
        .then(data => {
          setData(data.data);
        });
    }
  }, [authToken, first]);

  useEffect(() => {
    setFirst(`first=${limit}`)
  }, [limit])

  useEffect(() => {
    if (authToken) {
      fetchTwitchData(`streams/followed?${first}&user_id=94739531`)
        .then(data => {
          setData(data.data);
          setUser_id(data.data)
        });
    } else if (appAccessToken) {
      fetchPublicTwitchData(`streams?${first}`)
        .then(data => {
          setData(data.data);
        });
    }
  }, [])


  console.log(data)

  return (
    <div className={"w-full flex h-screen  "}>
      <div className={"min-w-min overflow-x-scroll "}>
        <button onClick={redirectToTwitchAuth}>Se connecter avec Twitch</button>

        <Sidebar stream={data} limit={limit} setLimit={setLimit} />
      </div>
      <div className={"w-4/5"}>
        <RightsideHomepage />

      </div>
    </div>
  );
};

export default Homepage;
