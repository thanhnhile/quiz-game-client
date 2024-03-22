import { useState } from "react";
import { GameJoinCreateDto } from "./interface";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { joinGame, setAppState } from "../../reducers/appSlice";
import { Box, Stack, Typography } from "@mui/material";

const GameJoin: React.FC = () => {
  const [value, setValue] = useState<GameJoinCreateDto>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      await dispatch(joinGame(value));
      dispatch(setAppState("WAITING"));
      navigate(`/game-waiting/${value.code}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#610C9F",
        height: "100vh",
      }}
    >
      <Stack alignItems="center" justifyContent="center" direction="column">
        <Typography
          component="h1"
          sx={{ py: "1rem", fontSize: "6rem", fontWeight: "700px" }}
        >
          JOIN GAME
        </Typography>
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
      </Stack>
    </Box>
  );
};

export default GameJoin;
