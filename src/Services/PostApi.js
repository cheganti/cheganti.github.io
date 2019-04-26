class PostApi {
    constructor(url) {
    }
    request(url, method, body) {
      return fetch(url);
    }
  }