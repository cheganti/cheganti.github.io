import { GetApi } from './GetApi'
import { PostApi } from './PostApi'
import { PutApi } from './PutApi'
class RequestFactory {
  constructor() {
  }
  create(type, url) {
    if (type === "GET")
      return new GetApi().request(url);
    if (type === "POST")
      return new PostApi(url).request(url);
    if (type === "PUT")
      return new PutApi(url).request(url);
  }

};
export const factoryRequest = new RequestFactory("");