/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Содержит данные о задаче, включая информацию о доске
 */
export type models_GetUserTasksResponse = {
    boardName?: string;
    description?: string;
    id?: number;
    priority?: models_GetUserTasksResponse.priority;
    status?: models_GetUserTasksResponse.status;
    title?: string;
};
export namespace models_GetUserTasksResponse {
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

