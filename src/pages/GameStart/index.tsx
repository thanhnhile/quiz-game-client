import { createNewGame } from "./api";
import { useNavigate } from "react-router-dom";
import { Game } from "./interface";
import useSocket from "../../hooks/useSocket";

const GameStart: React.FC = () => {
  const navigate = useNavigate();
  const { createSocket } = useSocket();

  const handleNewGame = async () => {
    const payload = {
      timeLimit: "30M",
      questionListId: "65d86bcbc98ab84d452a5394",
    };
    const data: Game = await createNewGame(payload);
    if (data) {
      navigate(`/game-waiting/${data.code}`);
    }
  };

  return (
    <div>
      <button onClick={handleNewGame}>New game</button>
    </div>
  );
};

export default GameStart;
