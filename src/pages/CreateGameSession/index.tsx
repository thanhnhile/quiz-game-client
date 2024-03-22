import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { createNewGame, setAppState } from "../../reducers/appSlice";

const GameStart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNewGame = async () => {
    const newGamePayload = {
      questionListId: "65fd2866ef5e9726cb6518e8",
    };
    const { payload } = await dispatch(createNewGame(newGamePayload));
    dispatch(setAppState("WAITING"));
    payload?.code && navigate(`/game-waiting/${payload.code}`);
  };

  return (
    <div>
      <button onClick={handleNewGame}>New game</button>
    </div>
  );
};

export default GameStart;
