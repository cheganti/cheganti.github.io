const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container1');
app.appendChild(container);


let url = 'https://newsapi.org/v1/articles?source=CNBC&apiKey=172bf5976fff458cbf68f242df25671f';

let select = document.getElementById("apiUrl");
let options = ["CNBC", "mashable", "bbc-news", "cnn"];
for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;

    select.appendChild(el);
}
function changeUrl(newsUrl) {
    container.textContent = '';
    document.getElementById('card-deck').style.display = 'none';
    console.log(document.getElementById('apiUrl').value);

    let url = `https://newsapi.org/v1/articles?source=${newsUrl}&apiKey=172bf5976fff458cbf68f242df25671f`;
    console.log(url);
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let news = data.articles;
            // debugger;
            return news.map(function (news) {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');
                const h1 = document.createElement('p')
                h1.setAttribute('class', 'txtcolor')
                h1.textContent = `${news.title} `

                const pDesc = document.createElement('p');
                pDesc.textContent = `${news.description}`;

                const pPublisedP = document.createElement('p');
                pPublisedP.setAttribute('class', 'bold');
                pPublisedP.textContent = 'Published Date: ';
                const pPublishedAt = document.createElement('span');
                pPublishedAt.setAttribute('class', 'normal');
                pPublishedAt.textContent = `${news.publishedAt}`;
                pPublisedP.appendChild(pPublishedAt);

                const imgAnchor = document.createElement('a');
                imgAnchor.href = news.url;
                imgAnchor.target = '_blank';
                const imgurlToImage = document.createElement('img');
                imgurlToImage.src = news.urlToImage;
                imgurlToImage.style.width = '100%';

                imgAnchor.appendChild(imgurlToImage);

                const newsUrl = document.createElement('a');
                newsUrl.href = news.url;
                newsUrl.target = '_blank';
                newsUrl.textContent = `${newsUrl.href}`;

                const newsUrlDiv = document.createElement('div');
                newsUrlDiv.setAttribute('class', 'newsUrlDiv');
                const newsUrlspan = document.createElement('span');
                newsUrlspan.style.fontWeight = 'bold';
                newsUrlspan.textContent = 'Source Url: ';

                newsUrlDiv.appendChild(newsUrlspan);
                newsUrlDiv.appendChild(newsUrl);



                container.appendChild(card);

                //card.appendChild(imgurlToImage);
                card.appendChild(imgAnchor);
                card.appendChild(h1);
                card.appendChild(pDesc);
                card.appendChild(pPublisedP);
                card.appendChild(newsUrlDiv);

            })
        })
        .catch(function (error) {
            let errorMsg = "Somethig went wrong";
            const errContainer = document.createElement('h3');
            container.appendChild(errContainer);
            console.log(JSON.stringify(error));
        });
}

