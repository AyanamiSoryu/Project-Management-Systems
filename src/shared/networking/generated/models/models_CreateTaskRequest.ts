/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Запрос на создание новой задачи
 */
export type models_CreateTaskRequest = {
    assigneeId: number;
    boardId: number;
    description: string;
    priority?: models_CreateTaskRequest.priority;
    title: string;
};
export namespace models_CreateTaskRequest {
    export enum priority {
        LOW = 'Low',
        MEDIUM = 'Medium',
        HIGH = 'High',
    }
}

