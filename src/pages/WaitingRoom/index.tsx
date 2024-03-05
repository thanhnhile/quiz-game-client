import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GAME_EVENTS } from '../../utils/events';
import { GameStartDto, Participant } from './interface';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import {
  addParticipant,
  getJoinedParticipants,
  startGame,
} from '../../reducers/waittingSlice';
import { initSocket, setAppState, setUIState } from '../../reducers/appSlice';

const WaitingRoom = () => {
  const { code } = useParams();
  const { participants } = useSelector((state: RootState) => state.waitting);
  const { socket, name } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNewJoin = (newParticipant: Participant) => {
    dispatch(addParticipant(newParticipant));
  };

  useEffect(() => {
    if (code) {
      dispatch(getJoinedParticipants(code));
      dispatch(initSocket({ isHost: true }));
    }
  }, [code]);
  useEffect(() => {
    socket?.on(GAME_EVENTS.NEW_JOIN, handleNewJoin);
    socket?.on(GAME_EVENTS.START, () => {
      dispatch(setAppState('IN_PROGRESS'));
      dispatch(setUIState('COUNT_DOWN'));
      navigate(`/game/${code}`);
    });
  }, [socket]);

  const handleStart = () => {
    const payload: GameStartDto = {
      code: code ?? '',
    };
    dispatch(startGame(payload));
  };

  return (
    <div>
      <h1>{code}</h1>
      <button onClick={handleStart}>Start</button>
      <ul id='list-participant'>
        {participants?.map((paticipant: Participant) => {
          return <ol>{paticipant.name}</ol>;
        })}
      </ul>
    </div>
  );
};

export default WaitingRoom;
