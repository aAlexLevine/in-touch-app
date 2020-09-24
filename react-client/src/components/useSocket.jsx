import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socketClient, setSocketClient] = useState();

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      setSocketClient(socket);
      console.log('socket connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.log('connect error', error);
    });

    socket.on('error', (error) => {
      console.log('socket error', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('socket disconnected:', reason);
    });

    return () => {
      socket.close();
      console.log('socket closed on cleanup');
    };
  }, []);
  return socketClient;
};

export default useSocket;
