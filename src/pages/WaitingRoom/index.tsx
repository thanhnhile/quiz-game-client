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
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  makeStyles,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "react-qr-code";
import ParticipantPaper from "../../components/custom/Participant";

const WaitingRoom = () => {
  const { code } = useParams();
  const { participants } = useSelector((state: RootState) => state.waitting);
  const { socket, isHost } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNewJoin = (newParticipant: Participant) => {
    const index = participants?.findIndex(
      (item) => item.name === newParticipant.name
    );
    index < 0 && dispatch(addParticipant(newParticipant));
  };
  const handleLeave = (name: string) => {
    console.log("LEAVE: ", name);
    dispatch(removeParticipant(name));
  };

  useEffect(() => {
    if (code) {
      dispatch(initSocket());
      dispatch(getJoinedParticipants(code));
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

  console.log("PARS: ", participants);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        pt: 2,
        background:
          "linear-gradient(90deg, hsla(141, 54%, 86%, 1) 0%, hsla(333, 73%, 85%, 1) 50%, hsla(211, 58%, 79%, 1) 100%)",
      }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center">
          <Box sx={{ textAlign: "left", marginRight: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              Game PIN:
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: "4.5rem", fontWeight: "700" }}
            >
              {code}
            </Typography>
          </Box>
          <Box>
            <QRCode value={`http://localhost:3000`} size={100} />
          </Box>
        </Stack>
      </Paper>
      <Container sx={{ py: 2, mt: 2 }}>
        {isHost && (
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleStart}>
              Start
            </Button>
          </Box>
        )}
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <AnimatePresence>
            {participants?.map((paticipant: Participant, index) => {
              return (
                <ParticipantPaper
                  key={index}
                  elevation={3}
                  initial={{ scale: 0.3, opacity: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                  name={paticipant.name}
                />
              );
            })}
          </AnimatePresence>
        </Stack>
      </Container>
    </Box>
  );
};

export default WaitingRoom;
