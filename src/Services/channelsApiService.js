// Options for the select.
import { ErrorHandler } from '../ErrorHandlers/singletonErrorHandlers';
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
            new ErrorHandler().handleErrors(err);
        }
    }
}