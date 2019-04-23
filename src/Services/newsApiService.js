import { API_KEY, base_url } from '../Constants/applicationConstants';
import { ErrorHandler } from '../ErrorHandlers/singletonErrorHandlers';
import { api } from './Apicall';
import ApiProxy from './ApiProxy';
export class NewsApiService {
    async getNewsArticles(channelCode) {
        let url = `${base_url}${channelCode}&apiKey=${API_KEY}`;
        try {
            const apiProxy = new ApiProxy(api);
            const response = await apiProxy.proxyLayorGet(url);
            return await response.json();

        } catch (err) {
            new ErrorHandler().handleErrors(err);
        }
    }
}