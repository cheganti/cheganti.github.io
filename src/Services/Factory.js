import { GetApi } from './GetApi';
import { PostApi } from './PostApi';
import { PutApi } from './PutApi';
export class RequestFactory {
 static create(type, url) {
    if (type === "GET")
      return new GetApi(url);
    if (type === "POST")
      return new PostApi(url);
    if (type === "PUT")
      return new PutApi(url);
  }
};