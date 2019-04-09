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
        const ddlContainer = document.getElementById('ddlContainer');
        const ddl = document.createElement('select');
        ddl.setAttribute('class', 'form-control');
        ddl.setAttribute('id', 'selectChannelId');
        ddlContainer.appendChild(ddl);
        handleEvents();
    }
}
export default NewsArtiles;
new NewsArtiles();



