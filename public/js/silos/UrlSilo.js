export default class UrlSilo {

    constructor(id, settings) {
        this.id = id;
        this.settings = settings;
    }

    render() {
        if (!this.settings.hasOwnProperty('d')) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#urlSilo.noData');
            return 'ERROR. See console.';
        }
        return '<div id="urlSiloData" contenteditable="true">' + this.settings.d + '</div>';
    }

    save() {
        this.settings.d = document.getElementById('urlSiloData').innerHTML;
    }

    getId() {
        return this.id;
    }

    getName() {
        return UrlSilo.NAME;
    }

    getSettings() {
        return this.settings;
    }
}

UrlSilo.NAME = 'url';
UrlSilo.DEFAULT_SETTINGS = {
    d: '拜托, chänge moi (:'
};
