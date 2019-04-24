import { factoryRequest } from './Factory';
export default class ApiProxy {
    constructor(type, url) {
        return factoryRequest.create(type, url).request(url);
    }
}