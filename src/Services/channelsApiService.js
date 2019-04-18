// Options for the select.
import { ErrorHandler } from '../ErrorHandlers/errorHandlers';
import { api } from './Api';

export class ChannelsApiService {
    constructor() {
        this.sourcesAPI = 'https://newsapi.org/v1/sources';
    }
    async getNewsChannelCategories() {
        try {
            const response = await api.get(this.sourcesAPI);
            return await response.json();
        } catch (err) {
            ErrorHandler.handleErrors(err);
        }
    }
}