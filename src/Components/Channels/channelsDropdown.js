
export class ChannelsDropdown {
    bindOptions(channels) {
        // let options = channels.map(channel => ({ name: channel.name, id: channel.id, cate: channel.category }));
        const select = document.getElementById("apiUrl");
        channels.forEach(item => {
            let el = document.createElement("option");
            el.textContent = item.name;
            el.value = item.id;
            select.appendChild(el);
        });
    }
}
