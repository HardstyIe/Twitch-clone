import { useState } from 'react';
import Streambox from '../StreamLine/StreamBox/Streambox';

const StreamLine = ({ streams, onShowMore, title, userData }) => {
  const [visibleStreams, setVisibleStreams] = useState(5); // Set the initial number of visible streams

  const handleShowMore = () => {
    if (visibleStreams >= streams.length) {
      setVisibleStreams(5); // Reset visible streams if no more streams to show
    } else {
      setVisibleStreams(visibleStreams + 5); // Increase the number of visible streams
    }
    onShowMore();
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className='flex justify-center w-full gap-5 p-5 stream-list'>
        {streams && streams.slice(0, visibleStreams).map((stream, index) => (
          <Streambox key={index} stream={stream} userData={userData} />
        ))}
      </div>
      {streams && visibleStreams < streams.length && (
        <button onClick={handleShowMore}>Afficher plus</button>
      )}
    </div>
  );
};

export default StreamLine
