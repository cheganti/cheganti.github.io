import 'whatwg-fetch';
import '@babel/polyfill';
import { HandleShowNewsEvents } from './handleShowNewsEvents';
import './Styles/main.css';

class Main {
    constructor() {
        const app = document.getElementById('root');

        const jumbotron = document.createElement('div');
        jumbotron.setAttribute('class', 'jumbotron row');
        jumbotron.setAttribute('id', 'ddlContainer');

        const jumbotronCol = document.createElement('div');
        jumbotronCol.setAttribute('class', 'col-3');

        const newsButton = document.createElement('button');
        newsButton.setAttribute('type', 'button');
        newsButton.setAttribute('class', 'btn btn-primary');
        newsButton.setAttribute('name', 'ShowNews');
        newsButton.innerText = "Show News Channles"
        newsButton.setAttribute('id', 'btnShowNews');

        app.appendChild(jumbotron);

        jumbotron.appendChild(jumbotronCol);
        jumbotronCol.appendChild(newsButton);

        const handleShowNewsEvents = new HandleShowNewsEvents();
        handleShowNewsEvents.showNewsEvents();
    }
}
export default Main;
new Main();
