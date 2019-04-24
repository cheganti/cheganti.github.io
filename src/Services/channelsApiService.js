// Options for the select.
import { ErrorHandler } from '../ErrorHandlers/singletonErrorHandlers';
import { requestFactory } from './Factory';
import ApiProxy from './ApiProxy';

export class ChannelsApiService {
    constructor() {
        this.sourcesAPI = 'https://newsapi.org/v1/sources';
    }
    async getNewsChannelCategories() {
        try {
            const apiProxy = await new ApiProxy("GET", this.sourcesAPI);
            return apiProxy.json();

        } catch (err) {
            new ErrorHandler().handleErrors(err);
        }
    }
}