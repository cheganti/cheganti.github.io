import { API_KEY, base_url } from '../Constants/applicationConstants';
import { ErrorHandlers } from '../ErrorHandlers/errorHandlers';
export class NewsApiService{
    async getNewsArticles(channelCode) {
        const errorHandlers = new ErrorHandlers();
        let url = `${base_url}${channelCode}&apiKey=${API_KEY}`;
        try {
            const response = await fetch(url);
            return await response.json();
           
        }catch(err){
            errorHandlers.handleErrors(err);
        }
    }
}