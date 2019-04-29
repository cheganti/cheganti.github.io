import { API_KEY, base_url } from '../Constants/applicationConstants';
import { ErrorHandler } from '../ErrorHandlers/singletonErrorHandlers';
import  ApiProxy  from './ApiProxy';
import { RequestFactory }  from './Factory';
export class NewsApiService {
    async getNewsArticles(channelCode) {
        let url = `${base_url}${channelCode}&apiKey=${API_KEY}`;
        try {
            const apiInst = RequestFactory.create('GET', url);
            const getApiProxy = new ApiProxy(apiInst);
            const data = await getApiProxy.request(url);
            return await data.json();
        } catch (err) {
            new ErrorHandler().handleErrors(err);
        }
    }
}