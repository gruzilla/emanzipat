"use strict";

/* global console, crypto */

export default class EmanzipatInitializer {

    constructor() {
        this.valid = false;
        this.id = null;
        this.data = null;

        let [, id, data] = window.location.href.match(EmanzipatInitializer.URL_PATTERN) || [];

        if (typeof(id) === 'undefined' || typeof(data) === 'undefined') {
            this.valid = false;
            return;
        }

        this.id = id;
        try {
            this.data = JSON.parse(EmanzipatInitializer.b64DecodeUnicode(data));
        } catch (e) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#silo.invalid', e);
            this.valid = false;
            console.debug(data);
            return;
        }

        if (!this.data.hasOwnProperty('d') || !this.data.hasOwnProperty('s') ||
            !this.data.d.hasOwnProperty('l') || !this.data.d.hasOwnProperty('v') ||
            !this.data.d.hasOwnProperty('id')
        ) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#silo.invalid');
            this.valid = false;
            return;
        }

        if (this.data.d.v < EmanzipatInitializer.VERSION) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#silo.version');
            this.valid = false;
            return;
        }

        this.valid = true;
    }

    static getInitializationUrl(name, settings) {
        let id = EmanzipatInitializer.generateId();

        console.info('https://github.com/gruzilla/emanzipat/blob/master/codes.md#initialized');
        console.debug(id, name, settings);
        return '/silo/' + id + '/' + EmanzipatInitializer.b64EncodeUnicode(JSON.stringify(
            this.wrapSettings(
                id,
                name,
                settings
            )
        ));
    }

    static getUrl(silo) {
        console.info('https://github.com/gruzilla/emanzipat/blob/master/codes.md#updated');
        return '/silo/' + silo.getId() + '/' + EmanzipatInitializer.b64EncodeUnicode(JSON.stringify(
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

    /**
     * very unhappy with this atm, because it is me who decides which encoding
     * is used for storage. this is not democratic at all
     * also very unhappy that IE does not support TextEncoding yet
     * and then again very unhappy that TextEncoding does not support other encodings
     * but utf-8 and even recently droped utf-16 support... what a world are we living in?
     * read more in the findings: https://github.com/gruzilla/emanzipat/blob/master/findings.md
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
     */
    static b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }

    /**
     * very unhappy with this atm, because it is me who decides which encoding
     * is used for storage. this is not democratic at all
     * also very unhappy that IE does not support TextEncoding yet
     * and then again very unhappy that TextEncoding does not support other encodings
     * but utf-8 and even recently droped utf-16 support... what a world are we living in?
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
     */
    static b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    static wrapSettings(id, name, settings) {
        return {
            d: { // data required by EmanzipatInitializer to create a silo
                v: EmanzipatInitializer.VERSION, // Emanzipat data version
                id: id,                         // the randomly generated silo ID
                l: name,                        // name of the silo handler
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

EmanzipatInitializer.VERSION = 1;
EmanzipatInitializer.URL_PATTERN = /\/silo\/([^/]+)\/([^/]+)/i;