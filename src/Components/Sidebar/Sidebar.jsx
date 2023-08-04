import { useEffect, useMemo, useState } from 'react';
import { useTwitchAuth } from '../../Hooks/useTwitchAuth';
import { useTwitchData } from '../../Hooks/useTwitchData';

import "./SidebarStyle.css";
const Sidebar = ({ stream, limit, setLimit }) => {
  const { authToken, appAccessToken } = useTwitchAuth();
  const { fetchTwitchData, fetchPublicTwitchData } = useTwitchData();

  const userIDs = useMemo(() => {
    return stream.map(item => item.user_id).filter(Boolean);
  }, [stream]);

  const [profilPictures, setProfilPictures] = useState({});
  const [collapsed, setCollapsed] = useState(false); // New state variable for the collapsed state

  useEffect(() => {
    // Fetch the user data for the unique user IDs
    const fetchUserData = async () => {
      const userDataPromises = userIDs.map(id => {
        if (authToken && id) {
          return fetchTwitchData(`users?id=${id}`);
        } else if (appAccessToken) {
          return fetchPublicTwitchData(`users?id=${id}`);
        }
        return null;
      });

      const userDataResponses = await Promise.all(userDataPromises);

      // Process the user data and store it in a dictionary with user_id as the key
      const userDataDict = userDataResponses.reduce((acc, response) => {
        if (response?.data[0]?.id) {
          acc[response.data[0].id] = response.data[0].profile_image_url;
        }
        return acc;
      }, {});

      setProfilPictures(userDataDict);
    };

    fetchUserData();
  }, [authToken, appAccessToken, userIDs]);

  function formatViewerCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  }

  return (
    <div className={`max-h-screen p-4 text-white bg-black text-start ${collapsed ? 'w-20' : 'w-64'} sticky top-14 overflow-y-scroll`}>

      <div className={"flex items-center justify-between"}>
        <p className={`mb-4 text-2xl font-bold ${collapsed ? "hidden" : 'opacity-100'}`}>Pour Vous</p>

        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center justify-center w-8 h-8 bouton-reduction">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-500 ease-in-out ${collapsed ? 'transform rotate-180' : ''}`}>
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </i>
        </button>

      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="mb-4 font-bold">CHAÎNES SUIVIES</p>
          </div>
        </div>

        <ul className="space-y-4">
          {stream && stream.length > 0 ? (
            stream.slice(0, limit).map((streamData) => {
              return (
                <li className="flex items-center justify-between w-full mb-4 " key={streamData.id}>
                  <img
                    src={profilPictures[streamData.user_id] || ''}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  {!collapsed && ( // Don't show this part if the sidebar is collapsed
                    <div className="w-2/4">
                      <p className="text-sm font-bold">{streamData.user_name}</p>
                      <p className="overflow-hidden text-sm text-gray-400 overflow-ellipsis whitespace-nowrap">Playing {streamData.game_name}</p>
                    </div>
                  )}

                  {!collapsed && ( // Don't show this part if the sidebar is collapsed
                    <div className="flex items-center gap-2">
                      <p className="live-indicator"></p>

                      <p className="text-sm font-bold">{formatViewerCount(streamData.viewer_count)}</p>
                    </div>
                  )}
                </li>
              );
            })
          ) : (
            <p>No streams available.</p>
          )}
        </ul>

        <button onClick={() => { setLimit(limit + 12) }} className="w-full py-2 mt-2 font-bold text-center text-purple-500 rounded bg-redcherry">
          Afficher plus
        </button>
      </div>

      <div className="mt-8">
        <p className="mb-4 font-bold">CHAÎNES RECOMMANDÉES</p>

        <ul className="space-y-4">
          {stream && stream.length > 0 ? (
            stream.slice(0, limit).map((streamData) => {
              return (
                <li className="flex items-center mb-4" key={streamData.id}>
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-800 rounded-full">
                    <img
                      src={profilPictures[streamData.user_id] || ''}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{streamData.user_name}</p>
                    <p className="text-sm text-gray-400">Playing {streamData.game_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{streamData.viewer_count}</p>

                  </div>
                </li>
              );
            })
          ) : (
            <p>No streams available.</p>
          )}
        </ul>

        <button onClick={() => { setLimit(limit + 12) }} className="w-full py-2 mt-2 font-bold text-center text-purple-500 rounded bg-redcherry">
          Afficher plus
        </button>
      </div>
    </div >
  );
};
export default Sidebar;
