import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { createNewGame } from '../../reducers/appSlice';

const GameStart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNewGame = async () => {
    const newGamePayload = {
      timeLimit: '1M',
      questionListId: '65e5365a7f677e7850645c98',
    };
    const { payload } = await dispatch(createNewGame(newGamePayload));
    navigate(`/game-waiting/${payload?.code}`);
  };

  return (
    <div>
      <button onClick={handleNewGame}>New game</button>
    </div>
  );
};

export default GameStart;
