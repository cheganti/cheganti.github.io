import { GetApi } from './GetApi'
import { PostApi } from './PostApi'
import { PutApi } from './PutApi'
export default class ApiProxy {
    constructor(type, url) {
        if (type === "GET") {
            const getApi = new GetApi();
            return getApi.request(url);
        }
        if (type === "POST") {
            const postApi = new PostApi(url);
            return postApi.request(url);
        }
        if (type === "PUT") {
            const putApi = new PutApi(url);
            return putApi.request(url);
        }
    }
}