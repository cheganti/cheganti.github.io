export function getNewsArticles(channelCode) {
    const API_KEY = "172bf5976fff458cbf68f242df25671f";
    const base_url = `https://newsapi.org/v1/articles?source=`;
    let url = `${base_url}${channelCode}&apiKey=${API_KEY}`;
    return fetch(url)
        .then(resp => resp.json())
        .then(data => data.articles)
        .catch(error => {
            alert("Somethig went wrong while fetching News");
            // let errorMsg = "Somethig went wrong";
            // const errContainer = document.createElement('h3');
            // container.appendChild(errContainer);
            // console.log(JSON.stringify(error));
        });
}