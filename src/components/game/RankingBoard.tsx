import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { RankingBoardParticipant } from "@utils/interface";
import RaningBoardItem from "./RankingBoardItem";
import { useSelector } from "react-redux";
import { RootState } from "store";

export interface RankingBoardData {
  hasNextQuestion: boolean;
  isInTop3?: boolean;
  top3?: RankingBoardParticipant[];
  currentClient?: { yourRank: number } & RankingBoardParticipant;
  others?: RankingBoardParticipant[];
}
export interface RankingBoardComponentProps {
  data: RankingBoardData;
  handleNext: any;
}

const RankingBoardComponent: React.FC<RankingBoardComponentProps> = ({
  data,
  handleNext,
}) => {
  const { hasNextQuestion, isInTop3, top3, currentClient, others } = data ?? {
    hasNextQuestion: true,
  };
  const { isHost, name } = useSelector((state: RootState) => state.app);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontSize: "3.5rem",
          fontWeight: "700",
          color: "#fff",
          mb: isHost ? 0 : 2,
        }}
      >
        Ranking Board
      </Typography>
      <Container maxWidth='lg' sx={{ width: "60%", py: 2, mt: 2 }}>
        {hasNextQuestion && isHost && (
          <Box sx={{ textAlign: "right", mb: 4 }}>
            <Button variant='contained' color='secondary' onClick={handleNext}>
              Next
            </Button>
          </Box>
        )}
        <Stack direction='column' spacing={2}>
          {top3?.map((item: RankingBoardParticipant, index) => {
            return (
              <RaningBoardItem
                index={index}
                participant={item}
                isCurrentClient={item.name === name}
              />
            );
          })}
          {!(isHost || isInTop3) && (
            <RaningBoardItem
              index={currentClient.yourRank}
              participant={currentClient}
              isCurrentClient={currentClient.name === name}
            />
          )}
          {isHost
            ? others?.map((item: RankingBoardParticipant, index) => {
                return <RaningBoardItem index={index + 3} participant={item} />;
              })
            : null}
        </Stack>
      </Container>
    </Box>
  );
};

export default RankingBoardComponent;
