/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_AssigneeUserForTask } from './models_AssigneeUserForTask';
/**
 * Содержит основные данные о задачах с информацией об исполнителях и досках
 */
export type models_GetTasksResponse = {
    assignee?: models_AssigneeUserForTask;
    boardId?: number;
    boardName?: string;
    description?: string;
    id?: number;
    priority?: models_GetTasksResponse.priority;
    status?: models_GetTasksResponse.status;
    title?: string;
};
export namespace models_GetTasksResponse {
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

