import { Box, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useBoard } from '../../../domains/boards/hooks/use-board';
import useBoardTasks from '../../../domains/boards/hooks/use-board-tasks';
import { useBoardsQueryKey } from '../../../domains/boards/hooks/use-boards';
import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import useUpdateIssueStatus from '../../../domains/issues/hooks/use-update-issue-status';
import { Status } from '../../../domains/issues/models/status';
import BoardColumns from '../../pure-components/Board/Board-columns';
import BoardHeader from '../../pure-components/Board/Board-header';

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const boardId = id ? Number(id) : 0;
  const { data: board } = useBoard(boardId);
  const name = board?.name || 'Загрузка...';
  const { data: boardsTasks = [] } = useBoardTasks(boardId);
  const { mutate: updateStatus } = useUpdateIssueStatus();
  const queryClient = useQueryClient();
  const useBoardsTasksQueryKeyPrefix = [...useBoardsQueryKey];

  const [searchTerm, setSearchTerm] = useState('');

  const tasksByStatusMap = useMemo(() => {
    const initialMap = Object.values(Status).reduce(
      (acc, status) => {
        acc[status] = [];
        return acc;
      },
      {} as Record<Status, TaskOnBoard[]>
    );

    return boardsTasks
      .filter((task) => task.title?.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce<Record<Status, TaskOnBoard[]>>((acc, task) => {
        acc[task.status].push(task);
        return acc;
      }, initialMap);
  }, [boardsTasks, searchTerm]);

  const handleStatusChange = (taskId: number, status: Status) => {
    updateStatus(
      { taskId, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [...useBoardsTasksQueryKeyPrefix, boardId] });
        }
      }
    );
  };

  if (!id) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant='h5'>Проект не найден</Typography>
      </Box>
    );
  }

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fa', minHeight: '80vh' }}>
      <BoardHeader name={name} />
      <BoardColumns tasksByStatusMap={tasksByStatusMap} onStatusChange={handleStatusChange} />
    </Box>
  );
};

export default BoardPage;
