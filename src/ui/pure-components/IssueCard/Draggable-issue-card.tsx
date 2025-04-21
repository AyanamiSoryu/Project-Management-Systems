import { useDraggable } from '@dnd-kit/core';
import React, { memo } from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import IssueCard from './Issue-card';

type DraggableIssueCardProps = {
  task: TaskOnBoard;
};

const DraggableIssueCard = ({ task }: DraggableIssueCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { type: 'task', status: task.status }
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 1000 : 1
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <IssueCard task={task} />
    </div>
  );
};

export default memo(DraggableIssueCard);
