import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import { getTaskPriorityColor } from '../../../utils/issue-utils';

type TaskCardHeaderProps = {
  task: TaskOnBoard;
};

const TaskCardHeader = ({ task }: TaskCardHeaderProps) => {
  const priorityColor = task.priority ? getTaskPriorityColor(task.priority) : '#9e9e9e';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        pt: 1.5,
        pb: 0.5
      }}>
      <Box display='flex' alignItems='center' gap={1}>
        <Typography
          variant='caption'
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium'
          }}>
          {`TASK-${task.id}`}
        </Typography>
      </Box>

      {task.priority && (
        <Chip
          label={task.priority}
          size='small'
          sx={{
            height: 20,
            fontSize: '0.7rem',
            backgroundColor: `${priorityColor}20`,
            color: priorityColor,
            fontWeight: 'bold'
          }}
        />
      )}
    </Box>
  );
};

export default TaskCardHeader;
