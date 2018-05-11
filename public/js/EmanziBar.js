import EmanzipatInitalizer from './EmanzipatInitializer.js';

export default class Emanzibar {

    constructor(barId, silo) {
        this.barId = barId;
        this.silo = silo;

        this.render();
    }

    render() {
        let ele = document.getElementById(this.barId);
        ele.innerHTML = '<div class="buttons">' +
            '<button id="emanzibarNew">new</button>' +
            '<button id="emanzibarSave">save</button>' +
            '</div>';

        document.getElementById('emanzibarSave').addEventListener(
            'click',
            this.save.bind(this)
        );

        document.getElementById('emanzibarNew').addEventListener(
            'click',
            this.new.bind(this)
        );
    }

    save() {
        this.silo.save(); // TODO make this async
        window.location.href = EmanzipatInitalizer.getUrl(this.silo);
    }

    new() {
        window.location.href = EmanzipatInitalizer.getInitializationUrl();
    }

    // TODO: implement change listener and show that data has changed
}