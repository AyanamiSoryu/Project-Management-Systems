import { useCallback } from 'react';

import { Board } from '../models';
import useBoards from './use-boards';

export const useBoard = (boardId: number) => {
  const boardSelector = useCallback(
    (boards: Board[]) => {
      return boards.find((board) => board.id === boardId) ?? null;
    },
    [boardId]
  );
  return useBoards<Board | null>({ select: boardSelector });
};
