// Handle events on selecting the channels
import { getNewsArticles } from './ApiService/newsApiService';
import { bindNewsToDOM } from './News/newsArticlesList';

export function handleEvents() {
    const channelFilter = document.getElementById('apiUrl');
    const buttonFilter = document.getElementsByClassName('card-title');
    channelFilter.addEventListener('change', (e) => {
        if (e.target.tagName === 'SELECT' && e.target.value !== 'Select') {
            getNewsArticles(e.target.value).
                then(newsArticles => {
                    bindNewsToDOM(newsArticles);
                });
        }
    });

    for (let i = 0; i < buttonFilter.length; i++) {
        buttonFilter[i].addEventListener('click', (e) => {
            if (e.target.tagName === 'H4') {
                getNewsArticles(e.target.title).
                    then(newsArticles => {
                        bindNewsToDOM(newsArticles);
                    });
            }
        });
    }

}