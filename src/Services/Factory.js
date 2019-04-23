class GetApi {
  constructor(url) {
  }

  request(url, method, body) {
    return fetch(url);
  }
}

class PostApi {
  constructor(url) {
  }
  request(url, method, body) {
    return fetch(url);
  }
}

class PutApi {
  constructor(url) {
  }
  request(url, method, body) {
    return fetch(url);
  }
}

export class RequestFactory {
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


