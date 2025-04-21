/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_AssigneeUserForTask } from './models_AssigneeUserForTask';
/**
 * Ответ с данными задач, принадлежащих конкретной доске
 */
export type models_GetTasksOnBoardResponse = {
    assignee?: models_AssigneeUserForTask;
    description?: string;
    id?: number;
    priority?: models_GetTasksOnBoardResponse.priority;
    status?: models_GetTasksOnBoardResponse.status;
    title?: string;
};
export namespace models_GetTasksOnBoardResponse {
    export enum priority {
        LOW = 'Low',
        MEDIUM = 'Medium',
        HIGH = 'High',
    }
    export enum status {
        BACKLOG = 'Backlog',
        IN_PROGRESS = 'InProgress',
        DONE = 'Done',
    }
}

