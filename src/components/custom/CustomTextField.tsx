import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    marginBottom: '10px',
    fontWeight: '500',
    color: theme.palette.secondary.main,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main, // Change border color on hover
    },
  },
}));
