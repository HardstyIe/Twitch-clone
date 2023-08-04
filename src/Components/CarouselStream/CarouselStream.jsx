import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Avatar } from '@mui/material';
import Fab from '@mui/material/Fab';
import React, { useRef, useState } from 'react';
import {
  ResponsiveContainer,
  StackedCarousel
} from 'react-stacked-center-carousel';
import { TwitchEmbed } from 'react-twitch-embed';

import '../CarouselStream/CarouselStreamStyle.css';

const TwitchExample = ({ data, userData }) => {
  const ref = useRef();
  const [currentVideo, setCurrentVideo] = useState(null);

  if (data.length <= 3) {
    return <div>Loading...</div>;
  }

  return (
    <div className='twitch'>
      <div style={{ width: '100%', position: 'relative' }}>
        <ResponsiveContainer
          carouselRef={ref}
          render={(width, carouselRef) => {
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={(props) => <Slide {...props} userData={userData && userData[props.dataIndex] && userData[props.dataIndex].data ? userData[props.dataIndex].data[0] : null} setCurrentVideo={setCurrentVideo} currentVideo={currentVideo} />}

                slideWidth={750}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
              />
            );
          }}
        />
        <Fab
          className='twitch-button left'
          size='small'
          onClick={() => ref.current?.goBack()}
        >
          <KeyboardArrowLeftIcon style={{ fontSize: 30 }} />
        </Fab>
        <Fab
          className='twitch-button right'
          size='small'
          onClick={() => ref.current?.goNext()}
        >
          <KeyboardArrowRightIcon style={{ fontSize: 30 }} />
        </Fab>
      </div>
    </div>
  );
};

export default TwitchExample;

export const Slide = React.memo(function (props) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex, userData, setCurrentVideo, currentVideo } = props;
  const { user_name, thumbnail_url, game_name, viewer_count, tags } = data[dataIndex];
  const { description } = userData || {};

  const previewImageUrl = thumbnail_url.replace('{width}', '750').replace('{height}', '500');
  const showPlayer = user_name === currentVideo;

  return (
    <div className='twitch-card' draggable={false}>
      <div className={`cover fill ${isCenterSlide ? 'off' : 'on'}`}>
        <div
          className='card-overlay fill'
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
        {showPlayer ? (
          <div style={{ position: 'relative', height: "100%", width: "100%" }}>
            <TwitchEmbed
              channel={user_name}
              id={user_name}
              theme="dark"
              muted
              width="100%"
              height="100%"
              withChat={false}
            />
          </div>
        ) : (
          <img className='cover-image fill' src={previewImageUrl} onClick={() => setCurrentVideo(user_name)} />
        )}
        <button
          onClick={() => setCurrentVideo(showPlayer ? null : user_name)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px'
          }}
        >
          {!showPlayer && <PlayArrowIcon />}
        </button>
      </div>
      <div className=' detail' onClick={() => { if (!isCenterSlide) swipeTo(slideIndex); }}>
        <div className='w-full h-ful discription'>
          <div className='flex-col twitch-card'>
            <div className="flex text-xs h-28">
              <Avatar className='avatar' src={userData.profile_image_url} />
              <div>
                <p className="username">{user_name}</p>
                <p>{game_name}</p>
                <p>{viewer_count} spectateurs</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {tag}
                </span>
              ))}
            </div>
            <div>
              <p className="description">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
