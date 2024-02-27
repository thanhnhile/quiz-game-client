import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { GAME_EVENTS } from '../../utils/events';
import { createSocket } from '../../utils/websocket';
import { getParticipants } from './api';
import { Participant } from './interface';

const WaitingRoom = () => {
  const { code } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const roomSocket = useRef<Socket | null>(null);

  const getJonnedClient = async () => {
    if (code) {
      const data = await getParticipants(code);
      data && setParticipants(data);
    }
  };

  const handleNewJoin = (newParticipants: Participant) => {
    setParticipants((prev) => [newParticipants, ...prev]);
  };

  useEffect(() => {
    getJonnedClient();
  }, [code]);

  useEffect(() => {
    if (roomSocket.current == null) {
      const socket = createSocket(code);
      socket.on('connect', () => {
        socket?.on(GAME_EVENTS.NEW_JOIN, handleNewJoin);
        console.log(socket);
      });
      roomSocket.current = socket;
    }
  }, [code]);

  const handleStart = () => {
    //server.current?.emit("startGame", { code });
  };

  console.log(participants);

  return (
    <div>
      <h1>{code}</h1>
      <button onClick={handleStart}>Start</button>
      <ul>
        {participants?.map((paticipant: Participant) => {
          return <ol>{paticipant.name}</ol>;
        })}
      </ul>
    </div>
  );
};

export default WaitingRoom;
