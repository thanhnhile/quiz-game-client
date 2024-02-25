import { useRef, useState } from 'react';
import useSocket from '../../hooks/useSocket';

const GameJoin: React.FC = () => {
  const codeInputRef = useRef<HTMLInputElement | null>(null);
  const { server, serverIsConnected, isConnected, createSocket } = useSocket();

  const handleJoinGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const socket = createSocket('game_starting');
    console.log('SOCKERT', socket);
    console.log(server);
    console.log({
      connected: serverIsConnected,
      value: codeInputRef.current?.value,
    });
    if (true) {
      const data = { code: codeInputRef.current?.value };
      server?.emit('join', data);
    }
  };

  return (
    <div>
      <form onSubmit={handleJoinGame}>
        <input
          ref={codeInputRef}
          type='text'
          maxLength={6}
          minLength={6}
          name='gameCode'
          placeholder='Input game code'
        />
        <input type='submit' value='Join' />
      </form>
    </div>
  );
};

export default GameJoin;
