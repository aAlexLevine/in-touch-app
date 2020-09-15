import React, { useEffect, useState, useRef } from 'react';

const TestVid = (props) => {
  const [mediaStream, setMediaStream] = useState();
  const video = useRef()

  // const hanldeSubmit = (event) => {
  //   event.preventDefault();
  //   sendMessage(messageText);
  //   setMessageText('');
  // };

  // const handleChange = (event) => {
  //   setMessageText(event.target.value);
  // };
  useEffect(() => {
    console.log('Testvid effect')
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then(function (stream) {
    //     /* use the stream */
    //     setMediaStream(stream)

    //   })
    //   .catch(function (err) {
    //     /* handle the error */
    //     console.log(err);
    //   });
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true}, function cb(stream) {
      // setMediaStream(stream)
      console.log('******', stream)
    video.current.srcObject = stream  
    })
  }, []);

  useEffect(()=> {
    if(!mediaStream) return;
    // console.log('************', mediaStream.then((s)=>s))
    video.current.srcObject = mediaStream
  }, [mediaStream])
console.log('Testvid rrendered')
  return (
    <div>
      <video ref={video}
        onLoadedMetadata={(e) => {
          e.target.play();
        }}
      ></video>
    </div>
  );
};

export default TestVid;
