import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useBoards from '../../../domains/boards/hooks/use-boards';

const BoardsPage = () => {
  const { data: boards, isLoading } = useBoards();
  const navigate = useNavigate();

  if (isLoading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (!boards || boards.length === 0) {
    return <Typography>Нет досок</Typography>;
  }

  const handleBoardClick = (id: number) => {
    navigate(`/board/${id}`);
  };

  return (
    <Box p={2}>
      <Typography variant='h4' mb={2}>
        Проекты
      </Typography>

      <Box display='flex' flexDirection='column' gap={2}>
        {boards.map((board) => (
          <Card
            key={board.id}
            onClick={() => {
              return handleBoardClick(board.id);
            }}
            sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant='h6'>{board.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BoardsPage;
