import { Socket, io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocket = (code: string = ""): Socket => {
  let socket = io(BASE_URL);
  if (code) {
    socket = io(BASE_URL, {
      query: { gameCode: code },
    });
  }

  return socket;
};
