import { fetch } from 'whatwg-fetch';
import { newsOptions } from './options';
import { handleEvents } from './handleEvents'

class NewsArtiles {
    constructor() {
        const app = document.getElementById('root');
        const container = document.createElement('div');
        container.setAttribute('class', 'container1');
        container.setAttribute('id', 'container1');
        app.appendChild(container);
        newsOptions();
        handleEvents();
    }
}
export default NewsArtiles;
new NewsArtiles();



