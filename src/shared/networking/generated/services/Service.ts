/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_CreateTaskRequest } from '../models/models_CreateTaskRequest';
import type { models_CreateTaskResponse } from '../models/models_CreateTaskResponse';
import type { models_GetBoardsResponse } from '../models/models_GetBoardsResponse';
import type { models_GetTaskByIDResponse } from '../models/models_GetTaskByIDResponse';
import type { models_GetTasksOnBoardResponse } from '../models/models_GetTasksOnBoardResponse';
import type { models_GetTasksResponse } from '../models/models_GetTasksResponse';
import type { models_GetTeamResponse } from '../models/models_GetTeamResponse';
import type { models_GetTeamsResponse } from '../models/models_GetTeamsResponse';
import type { models_GetUsersResponse } from '../models/models_GetUsersResponse';
import type { models_GetUserTasksResponse } from '../models/models_GetUserTasksResponse';
import type { models_UpdateTaskRequest } from '../models/models_UpdateTaskRequest';
import type { models_UpdateTaskResponse } from '../models/models_UpdateTaskResponse';
import type { models_UpdateTaskStatusRequest } from '../models/models_UpdateTaskStatusRequest';
import type { models_UpdateTaskStatusResponse } from '../models/models_UpdateTaskStatusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * Получить список всех досок
     * Возвращает массив досок с основной информацией и количеством задач в каждой
     * @returns models_GetBoardsResponse Успешный ответ со списком досок
     * @throws ApiError
     */
    public static getBoards(): CancelablePromise<Array<models_GetBoardsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/boards',
            errors: {
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
    /**
     * Получить задачи доски
     * Возвращает все задачи, принадлежащие указанной доске
     * @param boardId ID доски
     * @returns models_GetTasksOnBoardResponse OK
     * @throws ApiError
     */
    public static getBoards1(
        boardId: number,
    ): CancelablePromise<Array<models_GetTasksOnBoardResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/boards/{boardId}',
            path: {
                'boardId': boardId,
            },
            errors: {
                400: `Неверный формат ID доски`,
                404: `Доска не найдена`,
                500: `Ошибка сервера`,
            },
        });
    }
    /**
     * Получить список всех задач
     * Возвращает массив задач с полной информацией, включая данные исполнителей и досок
     * @returns models_GetTasksResponse OK
     * @throws ApiError
     */
    public static getTasks(): CancelablePromise<Array<models_GetTasksResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks',
            errors: {
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
    /**
     * Создать новую задачу
     * Создает новую задачу с указанными параметрами
     * @param input Данные для создания задачи
     * @returns models_CreateTaskResponse Задача успешно создана
     * @throws ApiError
     */
    public static postTasksCreate(
        input: models_CreateTaskRequest,
    ): CancelablePromise<models_CreateTaskResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/create',
            body: input,
            errors: {
                400: `Неверный формат данных или параметры`,
                404: `Доска или пользователь не найдены`,
                500: `Ошибка сервера при создании задачи`,
            },
        });
    }
    /**
     * Обновить задачу
     * Обновляет задачу по указанному ID
     * @param taskId ID задачи
     * @param input Данные для обновления задачи
     * @returns models_UpdateTaskResponse OK
     * @throws ApiError
     */
    public static putTasksUpdate(
        taskId: number,
        input: models_UpdateTaskRequest,
    ): CancelablePromise<models_UpdateTaskResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/tasks/update/{taskId}',
            path: {
                'taskId': taskId,
            },
            body: input,
            errors: {
                400: `Некорректные данные`,
                404: `Задача не найдена`,
                500: `Ошибка при обновлении задачи`,
            },
        });
    }
    /**
     * Обновить статус задачи
     * Обновляет статус задачи по указанному ID
     * @param taskId ID задачи
     * @param input Данные для обновления статуса задачи
     * @returns models_UpdateTaskStatusResponse OK
     * @throws ApiError
     */
    public static putTasksUpdateStatus(
        taskId: number,
        input: models_UpdateTaskStatusRequest,
    ): CancelablePromise<models_UpdateTaskStatusResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/tasks/updateStatus/{taskId}',
            path: {
                'taskId': taskId,
            },
            body: input,
            errors: {
                400: `Некорректные данные`,
                404: `Задача не найдена`,
                500: `Ошибка при обновлении статуса задачи`,
            },
        });
    }
    /**
     * Получить задачу по ID
     * Возвращает полную информацию о задаче, включая данные исполнителя и доски
     * @param taskId ID задачи
     * @returns models_GetTaskByIDResponse OK
     * @throws ApiError
     */
    public static getTasks1(
        taskId: number,
    ): CancelablePromise<models_GetTaskByIDResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{taskId}',
            path: {
                'taskId': taskId,
            },
            errors: {
                400: `Некорректный ID задачи`,
                404: `Задача не найдена`,
            },
        });
    }
    /**
     * Получить информацию о всех командах
     * Получает информацию о всех командах, включая количество пользователей и досок
     * @returns models_GetTeamsResponse OK
     * @throws ApiError
     */
    public static getTeams(): CancelablePromise<Array<models_GetTeamsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/teams',
            errors: {
                500: `Ошибка при получении команд`,
            },
        });
    }
    /**
     * Получить информацию о команде
     * Получает информацию о команде по ID, включая пользователей и доски
     * @param teamId ID команды
     * @returns models_GetTeamResponse OK
     * @throws ApiError
     */
    public static getTeams1(
        teamId: number,
    ): CancelablePromise<models_GetTeamResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/teams/{teamId}',
            path: {
                'teamId': teamId,
            },
            errors: {
                400: `Некорректный teamID`,
                404: `Команда не найдена`,
            },
        });
    }
    /**
     * Получить информацию о всех пользователях
     * Получает информацию о всех пользователях, включая их команды и количество задач
     * @returns models_GetUsersResponse OK
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<Array<models_GetUsersResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            errors: {
                500: `Ошибка при получении пользователей`,
            },
        });
    }
    /**
     * Получить задачи пользователя
     * Получает список задач для указанного пользователя по его ID
     * @param id ID пользователя
     * @returns models_GetUserTasksResponse OK
     * @throws ApiError
     */
    public static getUsersTasks(
        id: number,
    ): CancelablePromise<Array<models_GetUserTasksResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/tasks',
            path: {
                'id': id,
            },
            errors: {
                400: `Некорректный userID`,
                500: `Ошибка при получении задач пользователя`,
            },
        });
    }
}
