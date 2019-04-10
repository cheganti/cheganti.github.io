import 'whatwg-fetch';
import '@babel/polyfill';
import { EventsHandler } from './Components/eventsHandler';
import { ChannelsList } from './Components/Channels/ChannelsList';

class NewsArtilesChannel {
    constructor() {
        const app = document.getElementById('root');
        const container = document.createElement('div');
        container.setAttribute('class', 'container1');
        container.setAttribute('id', 'container1');

        const seleCol = document.createElement('div');
        seleCol.setAttribute('class', 'col-4');

        const ddlContainer = document.getElementById('ddlContainer');
        const ddl = document.createElement('select');
        ddl.setAttribute('class', 'form-control');
        ddl.setAttribute('id', 'selectChannelId');
        
        app.appendChild(container);
        ddlContainer.appendChild(seleCol);
        seleCol.appendChild(ddl);
        
        const channelsList = new ChannelsList();
        channelsList.showChannels();
        
        const eventsHandler = new EventsHandler();
        eventsHandler.handleEvents();
    }
}
export default NewsArtilesChannel;
new NewsArtilesChannel();



