import { useEffect, useRef } from 'react';
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

export const useSocket = ({ fetchPush }) => {
  const socketRef = useRef<socket.Socket>(null);

  useEffect(() => {
    socketRef.current = socket.io(SOCKET_URL);
    socketRef.current.on('fetchPost', () => {
      fetchPush('fetchPost');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return {};
};
