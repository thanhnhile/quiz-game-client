import { createContext, useEffect, useRef, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';

export type SocketManagerContextType = {
  isConnected: boolean;
  serverIsConnected: boolean;
  createSocket: Function;
  server: Socket | null;
};
export const SocketManagerContext = createContext<SocketManagerContextType>({
  isConnected: false,
  serverIsConnected: false,
  createSocket: () => {},
  server: null,
});

const URL = 'ws://localhost:3001';

type PropsType = {
  children: React.ReactNode;
};

const SocketManagerProvider: React.FC<PropsType> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [serverIsConnected, setServerIsConnected] = useState(false);
  const [manager, setManager] = useState<Manager | null>(null);
  const [server, setServer] = useState<Socket | null>(null);

  const createManager = () => {
    const manager = new Manager(URL);
    const server = manager.socket('');
    console.log({ manager, server });
    setManager(manager);

    server.on('connect', () => setServerIsConnected(true));
    server.on('disconnect', () => setServerIsConnected(false));
    setServer(server);
  };

  const createSocket = (namespace: string) => {
    if (manager !== null) {
      const socket = manager.socket(namespace);
      socket.on('connect', () => setIsConnected(true));
      socket.on('disconnect', () => setIsConnected(false));
      return socket;
    } else {
      createManager();
      createSocket(namespace);
    }
  };

  useEffect(() => {
    createManager();
    return () => {
      if (manager) {
        manager?.off();
        server?.off();
        setServerIsConnected(false);
      }
    };
  }, []);

  const contextValue: SocketManagerContextType = {
    isConnected,
    serverIsConnected,
    createSocket,
    server: server,
  };
  return (
    <SocketManagerContext.Provider value={contextValue}>
      {children}
    </SocketManagerContext.Provider>
  );
};

export default SocketManagerProvider;
