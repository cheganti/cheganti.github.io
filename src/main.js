import 'whatwg-fetch';
import '@babel/polyfill';
import { handleEvents } from './Components/handleEvents';
import { ChannelsList } from './Components/Channels/ChannelsList';

class NewsArtiles {
    constructor() {
        const app = document.getElementById('root');
        const container = document.createElement('div');
        container.setAttribute('class', 'container1');
        container.setAttribute('id', 'container1');
        app.appendChild(container);
        const channelsList = new ChannelsList();
        channelsList.showChannels();
        handleEvents();
    }
}
export default NewsArtiles;
new NewsArtiles();



