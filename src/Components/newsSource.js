// Options for the select
export class NewsSources {
    constructor() {
        this.sourcesAPI = 'https://newsapi.org/v1/sources';
    }
    getNewsChannelCategories() {
        return fetch(this.sourcesAPI).
            then(response => response.json()).
            then(data => this.newsOptions(data.sources)).
            catch(error => console.log(error));
    }
    newsOptions(sources) {
        let options = sources.map(source => ({ name: source.name, id: source.id, cate: source.category }));
        console.log("options:", options);
        const select = document.getElementById("apiUrl");
        sources.forEach(item => {
            let el = document.createElement("option");
            el.textContent = item.name;
            el.value = item.id;
            select.appendChild(el);
        });
    }
}
