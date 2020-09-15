import React, { useEffect, useState, useRef } from 'react';
import useUserMedia from './useUserMedia';

const AnotherTestVid = (props) => {
  const mediaStream = useUserMedia({ video: true, audio: true });
  const video = useRef()
  // if (mediaStream) {
  useEffect(()=>{
    video.current.srcObject = mediaStream;

  }, [mediaStream])
  // }
  console.log('AnotherTestVid')
  return (
    <div>
      <video
        ref={video}
        onCanPlay={(e)=>e.target.play()}
        autoPlay
        playsInline
        muted
      ></video>
    </div>
  );
};

export default AnotherTestVid;
