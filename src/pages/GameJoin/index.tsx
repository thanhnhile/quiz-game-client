import { useState } from "react";
import { GameJoinCreateDto } from "./interface";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { joinGame, setAppState } from "../../reducers/appSlice";
import { Box, Paper, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomTextField } from "../../components/custom/CustomTextField";
import Toast from "../../components/custom/Toast";

const FormPaper = styled(Paper)(({ theme }) => ({
  width: 400,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const JoinButton = styled(Button)(({ theme }) => ({
  width: "100%",
  boxShadow: `0 3px 4px ${theme.palette.secondary.main}`,
  transition: "ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    transform: "translateY(3px)",
  },
}));

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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Toast message="hello from hell" duration={1000} severity="success" />
      <Typography
        component="h1"
        sx={{
          py: "1rem",
          fontSize: "4.5rem",
          fontWeight: "700",
          color: "#fff",
        }}
        gutterBottom
      >
        QUIZ GAME!
      </Typography>
      <FormPaper>
        <form onSubmit={handleJoinGame}>
          <CustomTextField
            variant="outlined"
            id="code"
            value={value?.code}
            onChange={handleOnChange}
            type="text"
            name="code"
            fullWidth
            placeholder="Code"
            inputProps={{ maxLength: 6 }}
          />
          <CustomTextField
            id="name"
            value={value?.name}
            onChange={handleOnChange}
            name="name"
            fullWidth
            placeholder="Your name"
            inputProps={{ maxLength: 6 }}
          />
          <JoinButton variant="contained" color="secondary" type="submit">
            ENTER
          </JoinButton>
        </form>
      </FormPaper>
    </Box>
  );
};

export default GameJoin;
