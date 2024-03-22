import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { GAME_EVENTS } from "../../utils/events";
import { GameStartDto, Participant } from "./interface";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  addParticipant,
  getJoinedParticipants,
  removeParticipant,
  startGame,
} from "../../reducers/waittingSlice";
import { initSocket, setAppState, setUIState } from "../../reducers/appSlice";
import { Box, Paper } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const WaitingRoom = () => {
  const { code } = useParams();
  const { participants } = useSelector((state: RootState) => state.waitting);
  const { socket, isHost } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNewJoin = (newParticipant: Participant) => {
    dispatch(addParticipant(newParticipant));
  };
  const handleLeave = (name: string) => {
    dispatch(removeParticipant(name));
  };

  useEffect(() => {
    if (code) {
      dispatch(getJoinedParticipants(code));
      dispatch(initSocket());
    }
  }, [code]);
  useEffect(() => {
    socket?.on(GAME_EVENTS.NEW_JOIN, handleNewJoin);
    socket?.on(GAME_EVENTS.LEAVE, handleLeave);
    socket?.on(GAME_EVENTS.START, () => {
      dispatch(setAppState("IN_PROGRESS"));
      dispatch(setUIState("COUNT_DOWN"));
      navigate(`/game/${code}`);
    });
  }, [socket]);

  const handleStart = () => {
    const payload: GameStartDto = {
      code: code ?? "",
    };
    dispatch(startGame(payload));
  };

  return (
    <Box>
      <h1>{code}</h1>
      {isHost && <button onClick={handleStart}>Start</button>}

      <ul id="list-participant">
        <AnimatePresence initial={false}>
          {participants?.map((paticipant: Participant) => {
            return (
              <motion.li
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <Paper elevation={3}>{paticipant.name}</Paper>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </Box>
  );
};

export default WaitingRoom;
