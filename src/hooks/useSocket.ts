import { useContext, useEffect, useRef } from 'react';
import { SocketManagerContext } from '../contexts/SocketManagerProvider';
import { Socket } from 'socket.io-client';

const useSocket = (namespace: string = '') => {
  const { isConnected, createSocket, server, serverIsConnected } =
    useContext(SocketManagerContext);

  return { isConnected, createSocket, server, serverIsConnected };
};

export default useSocket;
