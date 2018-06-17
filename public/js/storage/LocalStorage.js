"use strict";

export default class LocalStorage {
    constructor(id, siloSettings) {
        this.id = id;
        this.settings = siloSettings;
    }

    load() {
        return localStorage.getItem(this.id);
    }

    isEmpty() {
        return localStorage.getItem(this.id) === null;
    }

    save(data) {
        localStorage.setItem(
            this.id,
            JSON.parse(JSON.stringify(data))
        );
    }
}