import { GetApi } from './GetApi'
import { PostApi } from './PostApi'
import { PutApi } from './PutApi'
class RequestFactory {
  constructor() {
  }
  create(type, url) {
    if (type === "GET")
      return new GetApi();
    if (type === "POST")
      return new PostApi(url);
    if (type === "PUT")
      return new PutApi(url);
  }
};
export const factoryRequest = new RequestFactory("");