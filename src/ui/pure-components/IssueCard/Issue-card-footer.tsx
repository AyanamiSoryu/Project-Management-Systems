import { Avatar, Box, Tooltip } from '@mui/material';
import React from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';

type TaskCardFooterProps = {
  task: TaskOnBoard;
};

const TaskCardFooter = ({ task }: TaskCardFooterProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        px: 2,
        pb: 1.5,
        pt: 0.5
      }}>
      {/* Assignee avatar */}
      {task.assignee && (
        <Tooltip title={task.assignee.fullName}>
          <Avatar
            src={task.assignee.avatarUrl}
            alt={task.assignee.fullName}
            sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
            {task.assignee.fullName.substring(0, 1)}
          </Avatar>
        </Tooltip>
      )}
    </Box>
  );
};

export default TaskCardFooter;
