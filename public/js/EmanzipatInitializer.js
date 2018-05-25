"use strict";

/* global console, crypto */

export default class EmanzipatInitalizer {

    constructor() {
        this.valid = false;
        this.id = null;
        this.data = null;

        let [, id, data] = window.location.href.match(EmanzipatInitalizer.URL_PATTERN) || [];

        if (typeof(id) === 'undefined' || typeof(data) === 'undefined') {
            this.valid = false;
            return;
        }

        this.id = id;
        try {
            this.data = JSON.parse(decodeURIComponent(data));
        } catch (e) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#silo.invalid', e);
            this.valid = false;
            return;
        }

        if (!this.data.hasOwnProperty('d') || !this.data.hasOwnProperty('s') ||
            !this.data.d.hasOwnProperty('l') || !this.data.d.hasOwnProperty('v') ||
            !this.data.d.hasOwnProperty('id')
        ) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#silo.invalid');
            this.valid = false;
        }

        this.valid = true;
    }

    static getInitializationUrl(name, settings) {
        let id = EmanzipatInitalizer.generateId();

        console.info('https://github.com/gruzilla/emanzipat/blob/master/codes.md#initialized');
        console.debug(id, name, settings);
        return '/silo/' + id + '/' + encodeURIComponent(JSON.stringify(
            this.wrapSettings(
                id,
                name,
                settings
            )
        ));
    }

    static getUrl(silo) {
        console.info('https://github.com/gruzilla/emanzipat/blob/master/codes.md#updated');
        return '/silo/' + silo.getId() + '/' + encodeURIComponent(JSON.stringify(
            this.wrapSettings(
                silo.getId(),
                silo.getName(),
                silo.getSettings()
            )
        ));
    }

    static generateId() {
        // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    static wrapSettings(id, name, settings) {
        return {
            d: { // data required by EmanzipatInitializer to create a silo
                v: EmanzipatInitalizer.VERSION, // Emanzipat data version
                id: id,                         // the randomly generated silo ID
                l: name                         // name of the silo handler
            },
            s: settings                     // silo settings
        };
    }

    isValid() {
        return this.valid;
    }

    getId() {
        return this.id;
    }

    getSettings() {
        return this.data.s;
    }

    getLoaderName() {
        return this.data.d.l;
    }
}

EmanzipatInitalizer.VERSION = 0;
EmanzipatInitalizer.URL_PATTERN = /\/silo\/([^/]+)\/([^/]+)/i;