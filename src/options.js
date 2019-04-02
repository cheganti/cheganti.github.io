// Options for the select
export function newsOptions() {
    const select = document.getElementById("apiUrl");
    let options = ["CNBC", "mashable", "bbc-news", "cnn"];
    options.forEach(item => {
        let el = document.createElement("option");
        el.textContent = item;
        el.value = item;
        select.appendChild(el);
    });
}