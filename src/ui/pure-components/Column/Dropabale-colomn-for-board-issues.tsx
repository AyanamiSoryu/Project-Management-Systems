import { useDroppable } from '@dnd-kit/core';
import { Box, Paper } from '@mui/material';
import React from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import { Status } from '../../../domains/issues/models/status';
import Column from './Column-for-board-issues';

type DroppableColumnProps = {
  id: Status;
  title: string;
  tasks: TaskOnBoard[];
  icon?: string;
  color?: string;
};

const DroppableColumn = ({ id, title, tasks, icon, color = '#e0e0e0' }: DroppableColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
    data: { type: 'column', status: id }
  });

  return (
    <Paper
      elevation={2}
      sx={{
        width: 320,
        height: '70vh',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        borderTop: `4px solid ${color}`,
        overflow: 'hidden'
      }}>
      <Box
        ref={setNodeRef}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Column title={title} tasks={tasks} icon={icon} />
      </Box>
    </Paper>
  );
};

export default DroppableColumn;
