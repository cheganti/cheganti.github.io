export class ChannelsDropdown {
    bindOptions(channels) {
        const select = document.getElementById("selectChannelId");
        channels.forEach(item => {
            let el = document.createElement("option");
            el.textContent = item.name;
            el.value = item.id;
            select.appendChild(el);
        });
    }
}