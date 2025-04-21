/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_AssigneeUserForTask } from './models_AssigneeUserForTask';
/**
 * Содержит полные данные задачи, включая информацию об исполнителе и доске
 */
export type models_GetTaskByIDResponse = {
    assignee?: models_AssigneeUserForTask;
    boardName?: string;
    description?: string;
    id?: number;
    priority?: models_GetTaskByIDResponse.priority;
    status?: models_GetTaskByIDResponse.status;
    title?: string;
};
export namespace models_GetTaskByIDResponse {
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

