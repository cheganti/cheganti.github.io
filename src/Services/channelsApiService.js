// Options for the select.
import { ErrorHandlers } from '../ErrorHandlers/errorHandlers';
export class ChannelsApiService {
    constructor() {
        this.sourcesAPI = 'https://newsapi.org/v1/sources';
    }
    async getNewsChannelCategories() {
        const errorHandlers = new ErrorHandlers();
        // errorHandlers.handleErrors("Hello"); 
        try {
            const response = await fetch(this.sourcesAPI);
            return await response.json();
        } catch (err) {
            errorHandlers.handleErrors(err);
        }
    }

}


