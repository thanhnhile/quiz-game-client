import React from "react";
import { RankingBoardParticipant } from "@utils/interface";
import { Typography, Paper, Stack, styled } from "@mui/material";

const CustomText = styled(Typography)(({ theme }) => ({
  variant: "h2",
  fontSize: "2.5rem",
  fontWeight: "700",
  lineHeight: "100%",
}));

const RaningBoardItem = ({
  index,
  participant,
  isCurrentClient = false,
  hasBackground = false,
}: {
  index: number;
  participant: RankingBoardParticipant;
  isCurrentClient?: Boolean;
  hasBackground?: Boolean;
}) => {
  return (
    <Paper
      square={false}
      elevation={index == 0 ? 2 : 0}
      sx={{
        width: "100%",
        px: 2,
        py: 1,
        backgroundColor: index == 0 || hasBackground ? "#fff" : "transparent",
        color: index == 0 || hasBackground ? "#000" : "#fff",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        flexWrap={"wrap"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <CustomText>{isCurrentClient ? "You" : participant.name}</CustomText>
        </Stack>
        <CustomText variant='h2'>{participant.totalScore}</CustomText>
      </Stack>
    </Paper>
  );
};

export default RaningBoardItem;
