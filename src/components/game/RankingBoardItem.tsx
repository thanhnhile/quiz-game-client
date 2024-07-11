import React from 'react';
import { RankingBoardParticipant } from '@utils/interface';
import { Box, Typography, Paper } from '@mui/material';
import 'boxicons';

const RaningBoardItem = ({
  index,
  participant,
  isCurrentClient = false,
}: {
  index: number;
  participant: RankingBoardParticipant;
  isCurrentClient?: Boolean;
}) => {
  return (
    <Paper
      square={false}
      elevation={index == 0 ? 2 : 0}
      sx={{
        width: '100%',
        px: 2,
        py: 1,
        backgroundColor: index == 0 ? '#fff' : 'transparent',
        color: index == 0 ? '#000' : '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h2' sx={{ fontSize: '2.5rem', fontWeight: '700' }}>
          {participant.name}
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontSize: '2.5rem',
            fontWeight: '700',
          }}
        >
          {participant.totalScore}
        </Typography>
        {isCurrentClient && <i class='bx bx-hot'></i>}
      </Box>
    </Paper>
  );
};

export default RaningBoardItem;
