import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Podium from "@components/result/Podium";
import { Box, Stack } from "@mui/material";
import RaningBoardItem from "@components/game/RankingBoardItem";
import { RankingBoardParticipant } from "@utils/interface";

const mockData: RankingBoardParticipant[] = [
  {
    name: "Nhi",
    totalScore: 100,
    latestScore: 0,
  },
  {
    name: "Nhi",
    totalScore: 100,
    latestScore: 0,
  },
  {
    name: "Nhi",
    totalScore: 100,
    latestScore: 0,
  },
  {
    name: "Nhi",
    totalScore: 100,
    latestScore: 0,
  },
  {
    name: "Nhi",
    totalScore: 100,
    latestScore: 0,
  },
  {
    name: "Nhi",
    totalScore: 100,
    latestScore: 0,
  },
];

const Result: React.FC = () => {
  const {
    rankingBoard = { data: mockData },
    isHost,
    name,
  } = useSelector((state: RootState) => state.app);
  const top3 = rankingBoard?.data?.slice(0, 3) ?? [];
  const others = rankingBoard?.data?.slice(3) ?? [];

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "60%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Podium top3={top3} />
        <Stack
          direction='column'
          spacing={2}
          sx={{
            mt: 2,
            width: "100%",
          }}
        >
          {others?.map((item: RankingBoardParticipant, index) => {
            return (
              <RaningBoardItem
                index={index + 3}
                participant={item}
                isCurrentClient={item.name === name}
                hasBackground={true}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Result;
