import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import { RankingBoard } from '@pages/Game/interface';
import { Participant } from '@pages/WaitingRoom/interface';
import React from 'react';

interface RankingBoardComponentProps {
  data: any;
  handleNext: any;
}

const RankingBoardComponent: React.FC<RankingBoardComponentProps> = ({
  data,
  handleNext,
}) => {
  const { hasNextQuestion, isInTop3, top3, currentClient } = data ?? {
    hasNextQuestion: true,
  };
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        pt: 2,
      }}
    >
      <Typography
        variant='h2'
        sx={{ fontSize: '3.5rem', fontWeight: '700', color: '#fff' }}
      >
        Ranking Board
      </Typography>
      <Container maxWidth='lg' sx={{ width: '60%', py: 2, mt: 2 }}>
        {hasNextQuestion && (
          <Box sx={{ textAlign: 'right', mb: 4 }}>
            <Button variant='contained' color='secondary' onClick={handleNext}>
              Next
            </Button>
          </Box>
        )}
        <Stack direction='column' spacing={2}>
          {isInTop3 ? (
            top3?.map((item, index) => {
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
                    <Typography
                      variant='h2'
                      sx={{ fontSize: '2.5rem', fontWeight: '700' }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant='h2'
                      sx={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                      }}
                    >
                      {item.score}
                    </Typography>
                  </Box>
                </Paper>
              );
            })
          ) : (
            <div></div>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default RankingBoardComponent;
