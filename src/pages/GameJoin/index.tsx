import { useEffect, useRef, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { Socket } from "socket.io-client";
import { joinGame } from "./api";
import { GameJoinCreateDto } from "./interface";
import { useNavigate } from "react-router-dom";

const GameJoin: React.FC = () => {
  const [value, setValue] = useState<GameJoinCreateDto>();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      (prev) =>
        ({
          ...prev,
          [e.target.name]: e.target.value.replaceAll(" ", ""),
        } as GameJoinCreateDto)
    );
  };

  const handleJoinGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      await joinGame(value);
      navigate(`/game-waiting/${value.code}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleJoinGame}>
        <input
          id="code"
          value={value?.code}
          onChange={handleOnChange}
          type="text"
          maxLength={6}
          minLength={6}
          name="code"
          placeholder="Input game code"
        />
        <br />
        <input
          id="name"
          value={value?.name}
          onChange={handleOnChange}
          name="name"
          maxLength={6}
          minLength={3}
          placeholder="Input your name"
        />
        <br />
        <input type="submit" value="Join" />
      </form>
    </div>
  );
};

export default GameJoin;
