/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_GetTeamBoards } from './models_GetTeamBoards';
import type { models_GetTeamUsers } from './models_GetTeamUsers';
/**
 * Содержит данные о команде, включая пользователей и доски
 */
export type models_GetTeamResponse = {
    boards?: Array<models_GetTeamBoards>;
    description?: string;
    id?: number;
    name?: string;
    users?: Array<models_GetTeamUsers>;
};

