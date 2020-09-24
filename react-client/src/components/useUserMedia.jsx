import { useState, useEffect } from 'react';

function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    if (!mediaStream) {
      //return;
      navigator.mediaDevices
        .getUserMedia(requestedMedia)
        .then((stream) => {
          setMediaStream(stream);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return function cleanup() {
        console.log('tracks cleanup');
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream]);

  return mediaStream;
}

export default useUserMedia;
