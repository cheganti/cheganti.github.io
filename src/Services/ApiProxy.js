class ApiProxy {
    constructor(api) {
     this.api = api;
    }
    request(url) {
        return this.api.request(url);
    }
 }
 export default ApiProxy;