import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  // const { current: socket } = useRef(
  //   io('http://localhost:8080', {
  //     // path: '/socket.io',
  //     // transports: ['websocket'],
  //     // upgrade: false,
  //   })
  // );
  const [socketClient, setSocketClient] = useState()

 

  useEffect(() => {
    // if(!socket) return
    // console.log('scoket hook', socket)

    const socket = io()

    socket.on('connect', () => {
      console.log('socket connected:', socket.id)
    })

    socket.on('connect_error', (error) => {
      console.log('connect error', error)
    });

    socket.on('error', (error) => {
      console.log('socket error', error)
    });

    socket.on('disconnect', (reason) =>  {
      console.log('socket disconnected:', reason)
    })

    setSocketClient(socket)
    return () => {
      socket.close()
      console.log('socket closed on cleanup')
    }
  }, [])
  return socketClient;
};

export default useSocket;
