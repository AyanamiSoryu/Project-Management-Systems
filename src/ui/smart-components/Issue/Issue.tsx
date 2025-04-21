import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';

import EditTaskModal from '@/ui/smart-components/TaskModal/Edit-task-modal';

import useIssue from '../../../domains/issues/hooks/use-issue';

const Issue = () => {
  const { data: issues, isLoading } = useIssue();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  if (isLoading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (!issues || issues.length === 0) {
    return <Typography>Нет досок</Typography>;
  }

  const handleTaskClick = (id: number) => {
    setSelectedTaskId(id);
    setOpenModal(true);
  };

  return (
    <Box p={2}>
      <Typography variant='h4' mb={2}>
        Все задачи
      </Typography>

      <Box display='flex' flexDirection='column' gap={2}>
        {issues.map((task) => (
          <Card key={task.id} onClick={() => handleTaskClick(task.id)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant='h6'>{task.title}</Typography>
              <Typography color='text.secondary'>{task.status}</Typography>
              <Typography color='text.secondary'>{task.boardName}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <EditTaskModal open={openModal} onClose={() => setOpenModal(false)} taskId={selectedTaskId} />
    </Box>
  );
};

export default Issue;
