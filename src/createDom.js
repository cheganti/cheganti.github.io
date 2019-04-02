//Create the dom after fetching the api call
export class domCreator {
    createNode(element) {
        return document.createElement(element);
    }

    append(parent, el) {
        return parent.appendChild(el);
    }

    setattribute(el, attr, attrname) {
        return el.setAttribute(attr, attrname);
    }

    createDom(news) {
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
        par.textContent = `${news.title} `;
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

        this.append(pPublisedP, pPublishedAt);
        this.append(imgAnchor, imgurlToImage);
        this.append(newsUrlDiv, newsUrlspan);
        this.append(newsUrlDiv, newsUrl);
        this.append(container, card);
        this.append(card, imgAnchor);
        this.append(card, par);
        this.append(card, pDesc);
        this.append(card, pPublisedP);
        this.append(card, newsUrlDiv);
    }
}
