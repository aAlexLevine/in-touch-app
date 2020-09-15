import React, { useEffect, useRef } from 'react';

const Video = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div>
      <video
        muted
        ref={videoRef}
        onCanPlay={(e) => {
          e.target.play();
        }}
        autoPlay
        playsInline
        style={{ objectFit: 'contain', height: '100px', width: '100px' }}
      ></video>
    </div>
  );
};

export default Video;
