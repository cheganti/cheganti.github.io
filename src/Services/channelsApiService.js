// Options for the select.
import { ErrorHandler } from '../ErrorHandlers/singletonErrorHandlers';
import  ApiProxy  from './ApiProxy';
import { RequestFactory }  from './Factory';

export class ChannelsApiService {
    constructor() {
        this.sourcesAPI = 'https://newsapi.org/v1/sources';
    }
    async getNewsChannelCategories() {
        try {
            const apiInst = RequestFactory.create("GET", this.sourcesAPI);
            const getApiProxy = new ApiProxy(apiInst);
            const data = await getApiProxy.request(this.sourcesAPI);
            return await data.json();

        } catch (err) {
            new ErrorHandler().handleErrors(err);
        }
    }
}