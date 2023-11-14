import { useEffect, useRef, useState } from 'react';
import * as socket from 'socket.io-client';

export interface ImportMeta {
  env: {
    VITE_URL_API?: string;
    VITE_SOCKET_URL?: string;
  };
}

export interface ISocketData {
  id: string;
  message: string;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useSocket = () => {
  const socketRef = useRef<socket.Socket>(null);
  const [data, setData] = useState([]);
  const [goFech, setGoFetch] = useState({ goFetch: false, fetch: '' });

  useEffect(() => {
    socketRef.current = socket.io(SOCKET_URL);
    socketRef.current.on('fetchPost', (socketData: ISocketData[]) => {
      console.log(socketData);
      setData(socketData);
      setGoFetch({ goFetch: true, fetch: 'fetchPost' });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return {
    data,
    goFech,
  };
};
