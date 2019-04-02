// Handle events on selecting the channels
import { getNews } from './getNews';
export function handleEvents() {
    const channelFilter = document.getElementById('apiUrl');
    const buttonFilter = document.getElementsByClassName('card-title');
    channelFilter.addEventListener('change', (e) => {
        if (e.target.tagName === 'SELECT') {
            getNews(e.target.value);
        }
    });

    for (let i = 0; i < buttonFilter.length; i++) {
        buttonFilter[i].addEventListener('click', (e) => {
            if (e.target.tagName === 'H4') {
                getNews(e.target.title);
            }
        });
    }

}