class NewsFeed {
    load() {
        const app = document.getElementById('root');
        const container = document.createElement('div');
        container.setAttribute('class', 'container1');
        container.setAttribute('id', 'container1');
        app.appendChild(container);
        this.newsOptions();
        this.handleEvents();
    }
    newsOptions() {
        const select = document.getElementById("apiUrl");
        let options = ["CNBC", "mashable", "bbc-news", "cnn"];
        options.forEach(item => {
            let el = document.createElement("option");
            el.textContent = item;
            el.value = item;
            select.appendChild(el);
        });
    }
    createNode = element => {
        return document.createElement(element);
    }

    append = (parent, el) => {
        return parent.appendChild(el);
    }

    setattribute = (el, attr, attrname) => {
        return el.setAttribute(attr, attrname);
    }

    handleEvents() {
        const channelFilter = document.getElementById('apiUrl');
        const buttonFilter = document.getElementsByClassName('card-title');
        channelFilter.addEventListener('change', (e) => {
            if (e.target.tagName === 'SELECT') {
                this.getNews(e.target.value);
            }
        });

        for (let i = 0; i <= buttonFilter.length; i++) {
            buttonFilter[i].addEventListener('click', (e) => {
                if (e.target.tagName === 'H4') {
                    this.getNews(e.target.title);
                }
            });
        }

    }

    createDom = (news) => {

        const container = document.getElementById('container1');
        let card = this.createNode('div'),
            par = this.createNode('p'),
            pDesc = this.createNode('p'),
            pPublisedP = this.createNode('p'),
            pPublishedAt = this.createNode('span'),
            imgAnchor = this.createNode('a'),
            imgurlToImage = this.createNode('img'),
            newsUrl = this.createNode('a'),
            newsUrlDiv = this.createNode('div'),
            newsUrlspan = this.createNode('span');
        this.setattribute(card, 'class', 'card');
        this.setattribute(par, 'class', 'txtcolor');
        this.setattribute(pPublisedP, 'class', 'bold');
        this.setattribute(pPublishedAt, 'class', 'normal');
        this.setattribute(newsUrlDiv, 'class', 'newsUrlDiv');
        pPublisedP.textContent = 'Published Date: ';
        newsUrlspan.style.fontWeight = 'bold';
        par.textContent = `${news.title} `
        pDesc.textContent = `${news.description}`;
        pPublishedAt.textContent = `${news.publishedAt}`;
        imgAnchor.href = news.url;
        imgAnchor.target = '_blank';
        imgurlToImage.src = news.urlToImage;
        imgurlToImage.style.width = '100%';
        newsUrl.href = news.url;
        newsUrl.target = '_blank';
        newsUrl.textContent = `${newsUrl.href}`;
        newsUrlspan.textContent = 'Source Url: ';

        this.append(pPublisedP, pPublishedAt)
        this.append(imgAnchor, imgurlToImage);
        this.append(newsUrlDiv, newsUrlspan);
        this.append(newsUrlDiv, newsUrl);

        this.append(container, card);
        this.append(card, imgAnchor);
        this.append(card, par);
        this.append(card, pDesc);
        this.append(card, pPublisedP);
        this.append(card, newsUrlDiv)
    }

    getNews = newsUrl => {

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
                return news.map(news => {
                    this.createDom(news);
                })
            })
            .catch(error => {
                let errorMsg = "Somethig went wrong";
                const errContainer = document.createElement('h3');
                container.appendChild(errContainer);
                console.log(JSON.stringify(error));
            });
    }

}








