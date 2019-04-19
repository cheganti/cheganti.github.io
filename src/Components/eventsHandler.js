// Handle events on selecting the channels
import { NewsApiService } from '../Services/newsApiService';
import { BindNews } from './News/newsArticlesList';

export class EventsHandler {
    constructor() {

    }
    handleEvents() {
        const channelFilter = document.getElementById('selectChannelId');
        const buttonFilter = document.getElementsByClassName('card-title');
        const bindNews = new BindNews();
        const newsApiService = new NewsApiService();
        channelFilter.addEventListener('change', (e) => {
            if (e.target.tagName === 'SELECT' && e.target.value !== 'Select') {
                newsApiService.getNewsArticles(e.target.value).
                    then(({articles}) => {
                        // console.log(articles);
                        bindNews.bindNewsToDOM(articles);
                    });
                   
            }
        });

        for (let i = 0; i < buttonFilter.length; i++) {
            buttonFilter[i].addEventListener('click', (e) => {
                if (e.target.tagName === 'H4') {
                    newsApiService.getNewsArticles(e.target.title).
                        then(newsArticles => {
                            bindNews.bindNewsToDOM(newsArticles);
                        });
                }
            });
        }

    }
}
