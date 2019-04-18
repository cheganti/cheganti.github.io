import { api } from './Api'
export default class ApiProxy {
    constructor(api) {
        this.api = api;
    }
    proxyLayorGet(url) {
        // alert('You do not have access to do get api call');
        // return Promise.resolve("You do not have access to do get call");
        return this.api.get(url);
        console.log("Logging Api calls...")
    }
}