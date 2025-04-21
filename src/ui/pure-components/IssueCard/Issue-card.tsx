import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import EditTaskModal from '../../smart-components/TaskModal/Edit-task-modal';
import TaskCardFooter from './Issue-card-footer';
import TaskCardHeader from './Issue-card-header';

type IssueCardProps = {
  task: TaskOnBoard;
};

const IssueCard = ({ task }: IssueCardProps) => {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <Card
      variant='outlined'
      sx={{
        cursor: 'grab',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }
      }}>
      <CardActionArea onClick={() => setModalOpened(true)}>
        <TaskCardHeader task={task} />

        <CardContent sx={{ pt: 1, pb: 1 }}>
          <Typography
            fontWeight='bold'
            sx={{
              fontSize: '0.95rem',
              mb: 1,
              lineHeight: 1.3
            }}>
            {task.title}
          </Typography>

          {task.description && (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
              {task.description}
            </Typography>
          )}
        </CardContent>

        <TaskCardFooter task={task} />
      </CardActionArea>
      <EditTaskModal open={isModalOpened} onClose={() => setModalOpened(false)} taskId={task.id} />
    </Card>
  );
};

export default IssueCard;
