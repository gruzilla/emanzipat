"use strict";

export default class FreeTextSilo {

    constructor(id, settings, storage) {
        this.id = id;
        this.settings = settings;
        this.storage = storage;
    }

    render() {
        let data = this.storage.load();
        return '<div id="FreeTextSilo" contenteditable="true">' + data + '</div>';
    }

    save() {
        this.storage.save(document.getElementById('FreeTextSilo').innerHTML);
    }

    getId() {
        return this.id;
    }

    getName() {
        return FreeTextSilo.NAME;
    }

    getSettings() {
        return this.settings;
    }
}

FreeTextSilo.NAME = 'freeText';
FreeTextSilo.DEFAULT_SETTINGS = {};
