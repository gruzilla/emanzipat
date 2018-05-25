"use strict";

export default class LocalStorageSilo {

    constructor(id, settings) {
        this.id = id;
        this.settings = settings;
    }

    render() {
        let data = localStorage.getItem(this.id);
        if (!data) {
            data = LocalStorageSilo.DEFAULT_DATA;
        }
        return '<div id="urlSiloData" contenteditable="true">' + data + '</div>';
    }

    save() {
        localStorage.setItem(
            this.id,
            document.getElementById('urlSiloData').innerHTML
        );
    }

    getId() {
        return this.id;
    }

    getName() {
        return LocalStorageSilo.NAME;
    }

    getSettings() {
        return this.settings;
    }
}

LocalStorageSilo.NAME = 'localStorage';
LocalStorageSilo.DEFAULT_SETTINGS = {};
LocalStorageSilo.DEFAULT_DATA = '拜托, chänge moi (:';