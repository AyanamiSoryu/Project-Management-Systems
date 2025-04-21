import { Box } from '@mui/material';
import React from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import DraggableIssueCard from '../IssueCard/Draggable-issue-card';

type ColumnContentProps = {
  tasks: TaskOnBoard[];
};

const ColumnContent = ({ tasks }: ColumnContentProps) => {
  return (
    <Box
      sx={{
        maxHeight: 'calc(100vh - 250px)',
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
      {tasks.map((task) => (
        <DraggableIssueCard key={task.id} task={task} />
      ))}

      {tasks.length === 0 && (
        <Box
          sx={{
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.5,
            fontSize: '0.9rem',
            borderRadius: 1,
            border: '1px dashed #ccc'
          }}>
          Перетащите задачу сюда
        </Box>
      )}
    </Box>
  );
};

export default ColumnContent;
