import { useState } from "react";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3001";

const useSocket = () => {
  const createSocket = (code: string = "") => {
    let socket = io(BASE_URL);
    if (code) {
      socket = io(BASE_URL, {
        query: { gameCode: code },
      });
    }

    return socket;
  };

  return { createSocket };
};

export default useSocket;
