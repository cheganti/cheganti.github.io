function getComponent() {
    return import(/* webpackChunkName: "channels-main" */ './channels-main').then(({ default: _ }) => {
       console.log("getComponent function");
    }).catch(error => 'An error occurred while loading the component');
}

export function handleShowNewsEvents() {
    const btnshownews = document.getElementById('btnShowNews');
    btnshownews.addEventListener('click', (e) => {
        console.log("btnShowNews click event");
        getComponent();
    });
}