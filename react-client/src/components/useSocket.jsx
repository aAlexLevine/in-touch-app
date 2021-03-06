import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket] = useState(io);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('useSocketUseEffect');
    socket.on('connect', () => {
      setIsConnected(true);
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
  }, [socket]);

  return [socket, isConnected];
};

export default useSocket;
