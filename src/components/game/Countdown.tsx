import { Box, Typography } from '@mui/material';
import React from 'react';

const Countdown: React.FC<{ value: number }> = ({ value }) => {
  return (
    //use MUI write code to show number with font size 4.5rem
    <Box>
      <Typography
        key={value}
        variant='h2'
        sx={{ color: '#fff', fontSize: '10rem', fontWeight: '700' }}
      >
        {value}
      </Typography>
    </Box>
  );
};
export default Countdown;
