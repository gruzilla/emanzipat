"use strict";

/* global console */

export default class Settings {
    constructor(data) {
        this.data = data;
    }

    load() {
        if (!this.data.hasOwnProperty('d')) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#urlStorage.noData');
            return 'ERROR. See console.';
        }
        return this.data.d;
    }

    save(data) {
        this.settings.d = JSON.parse(JSON.stringify(data));
    }
}