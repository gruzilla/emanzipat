import EmanzipatInitializer from './EmanzipatInitializer.js';
import UrlSilo from './silos/UrlSilo.js';
import EmanziBar from './EmanziBar.js';

export default class Emanzipat {

    constructor(contentId, barId) {
        this.contentId = contentId;
        this.barId = barId;
        this.silo = null;

        let initializer = new EmanzipatInitializer();
        if (initializer.isValid()) {
            this.loadSilo(
                initializer.getLoaderName(),
                initializer.getId(),
                initializer.getSettings()
            );
            this.loadBar();
            return;
        }

        this.showCreateSilo();
    }

    showCreateSilo() {
        let ele = document.getElementById(this.contentId);
        ele.innerHTML = '<h1>welcome to emanzip.at</h1>' +
            '<p><a href="https://github.com/gruzilla/emanzipat">read me</a>' +
            '<p><button id="createSilo">create new silo</button></p>';
        ele.classList.add('init');
        document.getElementById('createSilo').addEventListener(
            'click',
            Emanzipat.createSilo
        );
    }

    static createSilo() {
        window.location.href = EmanzipatInitializer.getInitializationUrl();
    };

    loadSilo(loaderName, id, settings) {
        this.silo = null;
        // TODO: use strategy pattern instead of switch
        switch(loaderName) {
            // TODO: implement additional silo-loaders
            case 'url':
            default:
                // per default the UrlSilo is used
                this.silo = new UrlSilo(id, settings);
                break;
        }

        let ele = document.getElementById(this.contentId);
        ele.innerHTML = this.silo.render();
        ele.classList.remove('init');
        ele.classList.add(loaderName);

        console.info('https://github.com/gruzilla/emanzipat/blob/master/codes.md#rendered');
    }

    loadBar() {
        new EmanziBar(this.barId, this.silo);
    }
}