import  { domCreator } from './createDom';
export function getNews(newsUrl) {
    let spinner = document.querySelector(".spinner"); //Spinner to show when fetching api data
    spinner.style.display = 'block'; //Spinner
    document.getElementById('container1').textContent = '';
    document.getElementById('card-deck').style.display = 'none';
    const API_KEY = "172bf5976fff458cbf68f242df25671f";
    const base_url = `https://newsapi.org/v1/articles?source=`;
    const api = (source) => fetch(base_url + source + '&' + 'apiKey=' + API_KEY);
    let url = `https://newsapi.org/v1/articles?source=${newsUrl}&apiKey=172bf5976fff458cbf68f242df25671f`;
    api(newsUrl)
        .then(resp => resp.json())
        .then((data) => {
            let news = data.articles;
            const objdomcreator = new domCreator();
            return news.map(news => {
                objdomcreator.createDom(news);
                spinner.style.display = 'none';  
            })
        })
        .catch(error => {
            let errorMsg = "Somethig went wrong";
            const errContainer = document.createElement('h3');
            container.appendChild(errContainer);
            console.log(JSON.stringify(error));
        });
}