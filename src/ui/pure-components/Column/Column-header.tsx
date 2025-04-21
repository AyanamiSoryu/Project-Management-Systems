import { Badge, Box, Typography } from '@mui/material';
import React from 'react';

type ColumnHeaderProps = {
  title: string;
  count: number;
  icon?: string;
};

const ColumnHeader = ({ title, count, icon }: ColumnHeaderProps) => {
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Box display='flex' alignItems='center' gap={1}>
        {icon && <Typography fontSize='18px'>{icon}</Typography>}
        <Typography variant='h6' fontWeight='bold'>
          {title}
        </Typography>
      </Box>
      <Badge
        badgeContent={count}
        color='primary'
        sx={{ '& .MuiBadge-badge': { fontSize: '0.8rem', height: '20px', minWidth: '20px' } }}
      />
    </Box>
  );
};

export default ColumnHeader;
