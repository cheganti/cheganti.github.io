class Api {
  constructor(pathToYourApi) {
    this.path = pathToYourApi;
  }

  request(url, method, body) {
    const params = {
      method,
      body: JSON.stringify(body),
    };
    return fetch(`${this.path}${url}`, params);
  }

  get(url) {
    return this.request(url, 'GET');
  }

  post(url, body) {
    return this.request(url, 'POST', body);
  }

  put(url, body) {
    return this.request(url, 'PUT', body);
  }
}
export const api = new Api("");
