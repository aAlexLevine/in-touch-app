import { useState, useEffect } from 'react';

function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(requestedMedia)
      .then((stream) => {
        setMediaStream(stream);
      })
      .catch((err) => {
        console.log(err);
      });
    return function cleanup() {
      console.log('tracks cleanup');
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  return mediaStream;
}

export default useUserMedia;
