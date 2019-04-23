import { api } from './Apicall'
export default class ApiProxy {
    constructor() {
    }
    proxyLayorGet(url) {
        // alert('You do not have access to do get api call');
        // return Promise.resolve("You do not have access to do get call");;
        return api.get(url);
    }
    proxyLayorPost(ur, body) {
        // return this.apiInstance.post(url);
        return Promise.resolve("You do not have access to do post call");;
    }
    proxyLayorPut(url, body) {
        // return this.apiInstance.put(url);
        return Promise.resolve("You do not have access to do put call");;
    }
}
