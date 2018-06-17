"use strict";

/* global console */

export default class Settings {
    constructor(id, siloSettings) {
        this.id = id;
        this.settings = siloSettings;
    }

    load() {
        if (!this.settings.hasOwnProperty('d')) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#urlStorage.noData');
            return 'ERROR. See console.';
        }
        return this.settings.d;
    }

    isEmpty() {
        return !this.settings.hasOwnProperty('d') || this.settings.d === null;
    }

    save(data) {
        this.settings.d = JSON.parse(JSON.stringify(data));
    }
}