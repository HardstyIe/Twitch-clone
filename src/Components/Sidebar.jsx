import { useEffect, useMemo, useState } from 'react';
import { useTwitchAuth } from '../Hooks/useTwitchAuth';
import { useTwitchData } from '../Hooks/useTwitchData';

const Sidebar = ({ stream, limit, setLimit }) => {
  const { authToken, redirectToTwitchAuth, appAccessToken } = useTwitchAuth();
  const { fetchTwitchData, fetchPublicTwitchData } = useTwitchData();

  const userIDs = useMemo(() => {
    return stream.map(item => item.user_id).filter(Boolean);
  }, [stream]);

  const [profilPictures, setProfilPictures] = useState({});

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



  return (
    <div className="w-64 min-h-screen p-4 text-white bg-gray-900 text-start">
      <div className={"flex items-center justify-between"}>
        <p className="mb-4 text-2xl font-bold">Pour Vous</p>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"
            />
          </svg>
        </button>
      </div>
      <div className="mt-8">
        <div>
          <div>
            <p className="mb-4 font-bold">CHAÎNES SUIVIES</p>
            <p></p>
          </div>
        </div>
        <ul>
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
        <button onClick={() => { setLimit(limit + 12) }}>
          <p className="text-sm font-bold">Afficher plus</p>
        </button>
      </div>
      <div>
        <p>CHAÎNES RECOMMANDÉES</p>
        <div>
          <ul>
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
          <button onClick={() => { setLimit(limit + 12) }}>
            <p className="text-sm font-bold">Afficher plus</p>
          </button>
        </div>
      </div >
    </div >
  );
};

export default Sidebar;
