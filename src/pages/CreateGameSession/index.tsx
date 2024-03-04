import { createNewGame } from "./api";
import { useNavigate } from "react-router-dom";
import { Game } from "./interface";

const GameStart: React.FC = () => {
  const navigate = useNavigate();

  const handleNewGame = async () => {
    const payload = {
      timeLimit: "1M",
      questionListId: "65e5365a7f677e7850645c98",
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
