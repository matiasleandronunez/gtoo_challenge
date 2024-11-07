import { APIRequestContext } from '@playwright/test';

export class APIRequestsHelper{
    readonly requestContext: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async getAllUsers() {
        return await this.requestContext.get('/public/v2/users');
    }

    async dispose() {
        await this.requestContext.dispose();
    }
}