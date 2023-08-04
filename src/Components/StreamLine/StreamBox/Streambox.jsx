import React from 'react';
import "../StreamBox/Streambox.css";

const Streambox = ({ stream, userData }) => {
  const user = userData.find(user => user.data[0].login.toLowerCase() === stream.user_name.toLowerCase());


  const previewImageUrl = stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180');

  // Filtrer les tags en fonction de vos critères
  const filteredTags = stream.tags && stream.tags.filter(tag => tag.language || tag.gameName);

  return (
    <div className='stream-box'>
      <img src={previewImageUrl} alt="Stream thumbnail" />

      <div className='flex gap-2 stream-info'>
        {user && <img src={user.data[0].profile_image_url} alt="Streamer avatar" className="h-10 rounded-full" />}
        <div className="flex flex-col text-start">
          <h2 className='stream-title'>{stream.title}</h2>
          <p className='stream-user-name'>{stream.user_name}</p>
          <p className='stream-game-name'>{stream.game_name}</p>
        </div>
      </div>
    </div>
  );
};

export default Streambox;
