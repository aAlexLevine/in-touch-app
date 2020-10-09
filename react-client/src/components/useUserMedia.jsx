import { useState, useEffect } from 'react';

const useUserMedia = (requestedMedia) => {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    if (!mediaStream) {
      navigator.mediaDevices
        .getUserMedia(requestedMedia)
        .then((stream) => {
          setMediaStream(stream);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return () => {
        console.log('tracks cleanup');
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }

    return undefined;
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};

export default useUserMedia;
