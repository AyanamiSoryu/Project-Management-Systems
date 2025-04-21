import { Box, Typography } from '@mui/material';
import React from 'react';

type BoardHeaderProps = {
  name: string;
};

const BoardHeader = ({ name }: BoardHeaderProps) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={3}
      sx={{
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: 2
      }}>
      <Typography variant='h4' fontWeight='bold'>
        {name}
      </Typography>

      <Box display='flex' gap={2} />
    </Box>
  );
};

export default BoardHeader;
