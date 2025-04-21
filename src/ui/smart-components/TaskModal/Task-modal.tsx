import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

import useBoards from '../../../domains/boards/hooks/use-boards';
import useCreateIssue from '../../../domains/issues/hooks/use-create-issue';
import useUpdateIssueStatus from '../../../domains/issues/hooks/use-update-isuue-status';
import { Priority } from '../../../domains/issues/models/prority';
import { Status } from '../../../domains/issues/models/status';
import useUsers from '../../../domains/users/hooks/useUsers';

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
};

const TaskModal = ({ open, onClose }: TaskModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [priority, setPriority] = useState<Priority | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [executorId, setExecutorId] = useState<string>('');

  const { mutate: createIssue } = useCreateIssue();
  const { mutate: updateIssueStatus } = useUpdateIssueStatus();

  const { data: boards } = useBoards();
  const { data: users } = useUsers();

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBoardId('');
    setPriority(null);
    setStatus(null);
    setExecutorId('');
  };

  const handleSubmit = () => {
    createIssue(
      {
        title,
        description,
        priority,
        boardId: +boardId,
        assigneeId: +executorId
      },
      {
        onSuccess: (data) => {
          if ('id' in data && data.id !== undefined) {
            updateIssueStatus({ taskId: data.id, status });
            resetForm();
            onClose();
          }
        },
        onError: (err) => console.log(err, 'ERROR')
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label='Название' value={title} onChange={(e) => setTitle(e.target.value)} margin='dense' />
        <TextField
          label='Описание'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <FormControl fullWidth>
          <InputLabel>Проект</InputLabel>
          <Select
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            label='Проект'
            MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}>
            {(boards ?? []).map((board) => {
              return (
                <MenuItem key={`${board.name}`} value={`${board.id}`}>
                  {board.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Приоритет</InputLabel>
          <Select<Priority | null>
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            label='Приоритет'
            MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}>
            <MenuItem value={Priority.Low}>Низкий</MenuItem>
            <MenuItem value={Priority.Medium}>Средний</MenuItem>
            <MenuItem value={Priority.High}>Высокий</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Статус</InputLabel>
          <Select<Status | null>
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            label='Статус'
            MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}>
            <MenuItem value={Status.Backlog}>Нужно сделать</MenuItem>
            <MenuItem value={Status.InProgress}>В процессе</MenuItem>
            <MenuItem value={Status.Done}>Готово</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Исполнитель</InputLabel>
          <Select
            value={executorId}
            onChange={(e) => setExecutorId(e.target.value)}
            label='Исполнитель'
            MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}>
            {(users ?? []).map((user) => {
              return (
                <MenuItem key={`${user.fullName}`} value={`${user.id}`}>
                  {user.fullName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant='contained' onClick={handleSubmit}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
