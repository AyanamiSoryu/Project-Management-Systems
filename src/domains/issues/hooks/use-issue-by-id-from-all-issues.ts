import { useCallback } from 'react';

import { Issue } from '../models';
import useIssue from './use-issue';

export const useIssueByIdFromAllIssues = (IssueId: number) => {
  const issueSelector = useCallback(
    (issues: Issue[]) => {
      return issues.find((issue) => issue.id === IssueId) ?? null;
    },
    [IssueId]
  );
  return useIssue<Issue | null>({ select: issueSelector });
};
