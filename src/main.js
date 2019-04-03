import { fetch } from 'whatwg-fetch';
import { NewsSources } from './newsSource';
import { handleEvents } from './handleEvents'

class NewsArtiles {
    constructor() {
        const app = document.getElementById('root');
        const container = document.createElement('div');
        container.setAttribute('class', 'container1');
        container.setAttribute('id', 'container1');
        app.appendChild(container);
        const newsCategories = new NewsSources();
        newsCategories.getNewsChannelCategories();
        handleEvents();
    }
}
export default NewsArtiles;
new NewsArtiles();



