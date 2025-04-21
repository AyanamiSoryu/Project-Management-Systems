/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Запрос на обновление существующей задачи
 */
export type models_UpdateTaskRequest = {
    assigneeId: number;
    description: string;
    priority?: models_UpdateTaskRequest.priority;
    status?: models_UpdateTaskRequest.status;
    title: string;
};
export namespace models_UpdateTaskRequest {
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

