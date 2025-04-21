import React from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import ColumnContent from './Column-content';
import ColumnHeader from './Column-header';

type ColumnProps = {
  title: string;
  tasks: TaskOnBoard[];
  icon?: string;
};

const Column = ({ title, tasks, icon }: ColumnProps) => {
  return (
    <>
      <ColumnHeader title={title} count={tasks.length} icon={icon} />
      <ColumnContent tasks={tasks} />
    </>
  );
};

export default Column;
