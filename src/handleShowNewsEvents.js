export class HandleShowNewsEvents {
    constructor() {

    }

    showNewsEvents() {
        const btnshownews = document.getElementById('btnShowNews');
        btnshownews.addEventListener('click', (e) => {
            this.getComponent();
        });
    }
    getComponent() {
        return import(/* webpackChunkName: "channels-main" */ './channels-main').then(({ default: _ }) => {
            console.log("getComponent function");
        }).catch(error => 'An error occurred while loading the component');
    }
}