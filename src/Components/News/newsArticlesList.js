import { NewsArticle } from './newsArticle';

export class BindNews{
    bindNewsToDOM(newsArticles){
        let spinner = document.querySelector(".spinner"); //Spinner to show when fetching api data
        spinner.style.display = 'block'; //Spinner
        document.getElementById('container1').textContent = '';
        document.getElementById('card-deck').style.display = 'none';
        const newsArticleCreator = new NewsArticle();
        if (newsArticles) {
            newsArticles.map(newsArticle => {
                newsArticleCreator.createDom(newsArticle);
                spinner.style.display = 'none';
            });
        }
    }
}