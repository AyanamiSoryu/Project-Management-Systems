import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { literalForIssues } from '../../../domains/issues/hooks/use-issue';
import useIssueById from '../../../domains/issues/hooks/use-issue-by-id';
import { useIssueByIdFromAllIssues } from '../../../domains/issues/hooks/use-issue-by-id-from-all-issues';
import useUpdateIssue from '../../../domains/issues/hooks/use-update-issue';
import { Priority } from '../../../domains/issues/models/prority';
import { Status } from '../../../domains/issues/models/status';
import useUsers from '../../../domains/users/hooks/useUsers';

type EditTaskModalProps = {
  open: boolean;
  onClose: () => void;
  taskId: number | null;
};

const EditTaskModal = ({ open, onClose, taskId }: EditTaskModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<Priority | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const issueIdForHook = taskId ? Number(taskId) : 0;

  const { data: issueById } = useIssueByIdFromAllIssues(issueIdForHook);
  const { data: task, isLoading: isTaskLoading } = useIssueById(taskId || 0);
  const { mutate: updateTask } = useUpdateIssue();

  const { data: users, isLoading: isUsersLoading } = useUsers();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleBoardClick = (id: number) => {
    navigate(`/board/${id}`);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority(undefined);
    setStatus(undefined);
    setAssigneeId('');
  };

  useEffect(() => {
    if (!open) {
      resetForm();
      setError(null);
      setSuccessMessage(null);
    }
  }, [open]);

  // Load task data when available
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority);
      setStatus(task.status);
      setAssigneeId(task.assignee ? `${task.assignee.id}` : '');
    }
  }, [task]);

  const prefixKeyForIssues = [...literalForIssues];

  const handleSubmit = () => {
    if (!taskId) return;

    if (!title.trim()) {
      setError('Название задачи обязательно');
      return;
    }

    if (!assigneeId) {
      setError('Выберите исполнителя');
      return;
    }

    setIsLoading(true);
    setError(null);

    updateTask(
      {
        taskId,
        title,
        description: description || '',
        assigneeId: parseInt(assigneeId, 10),
        priority,
        status
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: [...prefixKeyForIssues, taskId] });
          queryClient.invalidateQueries({ queryKey: [...prefixKeyForIssues] });

          setSuccessMessage(response.message || 'Задача успешно обновлена');
          setIsLoading(false);
          setTimeout(() => {
            onClose();
          }, 1500);
        },
        onError: (err: any) => {
          console.error('Error updating task:', err);
          setError(err?.message || 'Произошла ошибка при обновлении задачи');
          setIsLoading(false);
        }
      }
    );
  };

  const loading = isTaskLoading || isUsersLoading || isLoading;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
        <DialogTitle>Редактирование задачи</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {loading && !error ? (
            <Box display='flex' justifyContent='center' p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {error && (
                <Alert severity='error' sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {successMessage && (
                <Alert severity='success' sx={{ mb: 2 }}>
                  {successMessage}
                </Alert>
              )}
              <TextField
                label='Название*'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin='dense'
                error={!title.trim()}
                helperText={!title.trim() ? 'Обязательное поле' : ''}
              />
              <TextField
                label='Описание'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
              />
              <FormControl fullWidth>
                <InputLabel>Приоритет</InputLabel>
                <Select
                  value={priority || ''}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  label='Приоритет'>
                  <MenuItem value={Priority.Low}>Низкий</MenuItem>
                  <MenuItem value={Priority.Medium}>Средний</MenuItem>
                  <MenuItem value={Priority.High}>Высокий</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={status || ''}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  label='Статус'
                  MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}>
                  <MenuItem value={Status.Backlog}>Нужно сделать</MenuItem>
                  <MenuItem value={Status.InProgress}>В процессе</MenuItem>
                  <MenuItem value={Status.Done}>Готово</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required error={!assigneeId}>
                <InputLabel>Исполнитель*</InputLabel>
                <Select
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  label='Исполнитель*'
                  MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}>
                  {(users ?? []).map((user) => (
                    <MenuItem key={`${user.id}`} value={`${user.id}`}>
                      {user.fullName}
                    </MenuItem>
                  ))}
                </Select>
                {!assigneeId && (
                  <Box sx={{ color: 'error.main', mt: 0.5, ml: 1.5, fontSize: '0.75rem' }}>Обязательное поле</Box>
                )}
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
              return handleBoardClick(issueById?.boardId ?? 0);
            }}>
            перейти к проекту
          </Button>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant='contained' onClick={handleSubmit} disabled={loading || !!successMessage}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(null)}
        message={successMessage}
      />
    </>
  );
};

export default EditTaskModal;
