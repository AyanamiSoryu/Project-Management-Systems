import { closestCorners, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import { Status } from '../../../domains/issues/models/status';
import { getStatusColor } from '../../../utils/issue-utils';
import DroppableColumn from '../Column/Dropabale-colomn-for-board-issues';
import IssueCard from '../IssueCard/Issue-card';

type BoardColumnsProps = {
  tasksByStatusMap: Record<Status, TaskOnBoard[]>;
  onStatusChange: (taskId: number, status: Status) => void;
};

const statusColumns = [
  { status: Status.Backlog, title: 'To do', icon: '📋' },
  { status: Status.InProgress, title: 'In progress', icon: '⚙️' },
  { status: Status.Done, title: 'Done', icon: '✅' }
];

const BoardColumns = ({ tasksByStatusMap, onStatusChange }: BoardColumnsProps) => {
  const [activeTask, setActiveTask] = useState<TaskOnBoard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  );

  const findTaskById = (taskId: number): TaskOnBoard | null => {
    for (const status in tasksByStatusMap) {
      const task = tasksByStatusMap[status as Status].find((t) => t.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const taskId = active.id;
    const task = findTaskById(taskId);

    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const sourceStatus = active.data.current?.status;
    const destinationStatus = over.data.current?.status;

    if (!destinationStatus || sourceStatus === destinationStatus) return;

    onStatusChange(active.id, destinationStatus);
    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}>
      <Box
        display='flex'
        gap={3}
        sx={{
          overflowX: { xs: 'auto', md: 'hidden' },
          flexWrap: { xs: 'wrap', md: 'wrap' },
          justifyContent: { xs: 'center', md: 'center' },
          // minHeight: '70vh',
          // maxHeight: '72vh',
          pb: 2
        }}>
        {statusColumns.map((column) => (
          <SortableContext
            key={column.status}
            items={tasksByStatusMap[column.status].map((task) => task.id)}
            strategy={verticalListSortingStrategy}>
            <DroppableColumn
              id={column.status}
              title={column.title}
              tasks={tasksByStatusMap[column.status] ?? []}
              icon={column.icon}
              color={getStatusColor(column.status)}
            />
          </SortableContext>
        ))}
      </Box>

      <DragOverlay adjustScale>
        {activeTask ? (
          <Box
            sx={{
              transform: 'rotate(3deg)',
              boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
              opacity: 0.9,
              width: '280px'
            }}>
            <IssueCard task={activeTask} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardColumns;
