import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Video = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="video-mask">
      <video
        className="video"
        ref={videoRef}
        onCanPlay={(e) => {
          e.target.play();
        }}
        autoPlay
        playsInline
        // muted
        // style={{ objectFit: 'contain', height: '100px', width: '100px' }}
      >
        <track kind="captions" />
      </video>
    </div>
  );
};

Video.defaultProps = {
  stream: null,
};

Video.propTypes = {
  stream: PropTypes.objectOf(PropTypes.any),
};

export default Video;
