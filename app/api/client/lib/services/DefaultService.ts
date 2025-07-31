/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get list of items
     * @returns Item A list of items
     * @throws ApiError
     */
    public getList(): CancelablePromise<Array<Item>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/rest/items',
        });
    }
    /**
     * Get item by ID
     * @param id ID of the item
     * @returns Item A single item
     * @throws ApiError
     */
    public getDetail(
        id: string,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/rest/items/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Item not found`,
            },
        });
    }
}
