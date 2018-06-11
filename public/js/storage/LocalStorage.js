"use strict";

export default class LocalStorage {
    constructor(id) {
        this.id = id;
    }

    load() {
        return localStorage.getItem(this.id);
    }

    save(data) {
        localStorage.setItem(
            this.id,
            JSON.parse(JSON.stringify(data))
        );
    }
}