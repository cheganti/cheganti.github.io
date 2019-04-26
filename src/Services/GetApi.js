export class GetApi {
    request(url, method, body) {
      return fetch(url);
    }
  }
  export const api = new GetApi();