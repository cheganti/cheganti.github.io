import 'whatwg-fetch';
import '@babel/polyfill';
import { handleShowNewsEvents } from './handleShowNewsEvents';

class Main {
    constructor() {
        const app = document.getElementById('root');
        const container = document.createElement('button');
        container.setAttribute('type', 'button');
        container.setAttribute('class', 'btn btn-primary');
        container.setAttribute('name', 'ShowNews');
        container.innerText = "Show News"
        container.setAttribute('id', 'btnShowNews');
        app.appendChild(container);
        handleShowNewsEvents();
    }
}
export default Main;
new Main();
