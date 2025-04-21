import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import useIssue from '../../../domains/issues/hooks/use-issue';
import { Issue } from '../../../domains/issues/models';
import { Priority } from '../../../domains/issues/models/prority';
import { Status } from '../../../domains/issues/models/status';
import EditTaskModal from '../../smart-components/TaskModal/Edit-task-modal';

const Issues = () => {
  const { data: issues, isLoading } = useIssue();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [boardFilter, setBoardFilter] = useState<string>('');
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);

  const uniqueBoards = issues ? [...new Set(issues.map((issue) => issue.boardName))] : [];

  useEffect(() => {
    if (!issues) return;

    let result = [...issues];

    if (searchTerm) {
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter((issue) => issue.status === statusFilter);
    }

    if (priorityFilter) {
      result = result.filter((issue) => issue.priority === priorityFilter);
    }

    if (boardFilter) {
      result = result.filter((issue) => issue.boardName === boardFilter);
    }

    setFilteredIssues(result);
  }, [issues, searchTerm, statusFilter, priorityFilter, boardFilter]);

  const handleTaskClick = (id: number) => {
    setSelectedTaskId(id);
    setOpenModal(true);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriorityFilter(event.target.value);
  };

  const handleBoardChange = (event: SelectChangeEvent) => {
    setBoardFilter(event.target.value);
  };

  if (isLoading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (!issues || issues.length === 0) {
    return <Typography>Нет задач</Typography>;
  }

  return (
    <Box p={2}>
      <Typography variant='h4' mb={2}>
        Все задачи
      </Typography>

      {/* Блок фильтров */}
      <Box display='flex' gap={2} mb={2} flexWrap='wrap'>
        <TextField
          label='Поиск по названию'
          variant='outlined'
          size='small'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: '200px', flex: 1 }}
        />

        <FormControl size='small' sx={{ minWidth: '150px' }}>
          <InputLabel>Статус</InputLabel>
          <Select value={statusFilter} label='Статус' onChange={handleStatusChange}>
            <MenuItem value=''>Все</MenuItem>
            {Object.values(Status).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: '150px' }}>
          <InputLabel>Приоритет</InputLabel>
          <Select value={priorityFilter} label='Приоритет' onChange={handlePriorityChange}>
            <MenuItem value=''>Все</MenuItem>
            {Object.values(Priority).map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: '150px' }}>
          <InputLabel>Доска</InputLabel>
          <Select value={boardFilter} label='Доска' onChange={handleBoardChange}>
            <MenuItem value=''>Все</MenuItem>
            {uniqueBoards.map((board) => (
              <MenuItem key={board} value={board}>
                {board}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display='flex' flexDirection='column' gap={2}>
        {filteredIssues.length === 0 ? (
          <Typography>Задачи не найдены</Typography>
        ) : (
          filteredIssues.map((task) => (
            <Card
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 3
                }
              }}>
              <CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography variant='h6'>{task.title}</Typography>
                  <Box>
                    <Typography
                      variant='caption'
                      sx={{
                        bgcolor:
                          task.priority === Priority.High
                            ? 'error.light'
                            : task.priority === Priority.Medium
                              ? 'warning.light'
                              : 'info.light',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        mr: 1
                      }}>
                      {task.priority}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        bgcolor:
                          task.status === Status.Done
                            ? 'success.light'
                            : task.status === Status.InProgress
                              ? 'warning.light'
                              : 'info.light',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                      {task.status}
                    </Typography>
                  </Box>
                </Box>
                <Typography color='text.secondary' mt={1}>
                  Доска: {task.boardName}
                </Typography>
                {task.assignee && (
                  <Typography variant='body2' mt={1}>
                    Исполнитель: {task.assignee.fullName}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      <EditTaskModal open={openModal} onClose={() => setOpenModal(false)} taskId={selectedTaskId} />
    </Box>
  );
};

export default Issues;
