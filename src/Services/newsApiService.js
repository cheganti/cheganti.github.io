import { API_KEY, base_url } from '../Constants/applicationConstants';
import { ErrorHandler } from '../ErrorHandlers/singletonErrorHandlers';
import ApiProxy from './ApiProxy';
export class NewsApiService {
    async getNewsArticles(channelCode) {
        let url = `${base_url}${channelCode}&apiKey=${API_KEY}`;
        try {
            const apiProxy = await new ApiProxy("GET", url);
            return apiProxy.json();
        } catch (err) {
            new ErrorHandler().handleErrors(err);
        }
    }
}