// Options for the select
export class ChannelsApiService {
    constructor() {
        this.sourcesAPI = 'https://newsapi.org/v1/sources';
    }
    async getNewsChannelCategories() {
        try{
            const response = await fetch(this.sourcesAPI);
            return await response.json();
        }catch{
            return 'Error while getting the data';
        }
        
    }
}
