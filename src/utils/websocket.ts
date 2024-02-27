import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:3001';

export const createSocket = (code: string = '') => {
  let socket = io(BASE_URL);
  if (code) {
    socket = io(BASE_URL, {
      query: { gameCode: code },
    });
  }

  return socket;
};
