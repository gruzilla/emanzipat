"use strict";

/* global console */

import EmanzipatInitializer from './EmanzipatInitializer.js';
import FreeTextSilo from './silos/FreeTextSilo.js';
import EmanziBar from './EmanziBar.js';
import LocalStorage from './storage/LocalStorage.js';
import SettingsStorage from './storage/SettingsStorage.js';

export default class Emanzipat {

    constructor(contentId, barId) {
        this.contentId = contentId;
        this.barId = barId;
        this.silo = null;
        this.storage = null;

        let initializer = new EmanzipatInitializer();
        if (initializer.isValid()) {
            this.loadSilo(
                initializer.getLoaderName(),
                initializer.getId(),
                initializer.getSettings()
            );
            if (this.silo) {
                this.loadBar();
            }
            return;
        }

        this.showCreateSilo();
    }

    showCreateSilo() {
        let ele = document.getElementById(this.contentId);
        ele.innerHTML = '<h1>welcome to emanzip.at</h1>' +
            '<p><a href="https://github.com/gruzilla/emanzipat">read me</a>' +
            '<p><button id="createFreeTextSilo">create new<br />Free Text Silo</button></p>';
        ele.classList.add('init');
        document.getElementById('createFreeTextSilo').addEventListener(
            'click',
            (function () {this.showSetupSilo('freeText');}).bind(this)
        );
    }

    showSetupSilo(typeName) {
        let ele = document.getElementById(this.contentId);
        ele.innerHTML = '<h1>welcome to emanzip.at</h1>' +
            '<p><a href="https://github.com/gruzilla/emanzipat">read me</a>' +
            '<p>Great! Which <a href="https://github.com/gruzilla/emanzipat/blob/master/storage-backends.md">storage backend</a>?</p>' +
            '<p>' +
            'Silo Type: <select id="siloType"><option value="' + typeName +'">Free Text Silo</option></select><br />' +
            'Storage Backend: <select id="storageBackend"><option value="url">URL</option><option value="localStorage">Local Storage</option></select><br />' +
            '</p>' +
            '<button id="createSilo">Start!</button>';
        ele.classList.remove('init');
        ele.classList.add('create');
        document.getElementById('createSilo').addEventListener(
            'click',
            function () {Emanzipat.startSilo(
                document.getElementById('siloType').value,
                document.getElementById('storageBackend').value
            );}
        );
    }

    static startSilo(typeName, storageBackend) {
        // TODO: use strategy pattern instead of switch
        switch(typeName) {
            case 'freeText':
                let settings = FreeTextSilo.DEFAULT_SETTINGS;
                settings.s = storageBackend;
                window.location.href = EmanzipatInitializer.getInitializationUrl(
                    FreeTextSilo.NAME,
                    settings
                );
                break;
            default:
                console.error('Cannot create this silo, it is unkown.');
                break;
        }
    }

    loadSilo(loaderName, id, settings) {
        this.silo = null;
        this.storage = null;

        if (!('s' in settings)) {
            console.error('https://github.com/gruzilla/emanzipat/blob/master/codes.md#silo.noStorageBackend');
            return;
        }

        // TODO: use strategy pattern instead of switch
        switch(settings.s) {
            case 'url':
                this.storage = new SettingsStorage(id, settings);
                break;
            case 'localStorage':
                this.storage = new LocalStorage(id, settings);
                break;
        }

        // TODO: use strategy pattern instead of switch
        switch(loaderName) {
            // TODO: implement additional silo-loaders
            case 'freeText':
                if (this.storage.isEmpty()) {
                    this.storage.save('拜托, chänge moi (:'); // default value on initialization
                }
                this.silo = new FreeTextSilo(id, settings, this.storage);
                break;
            default:
                console.error('Cannot load this silo, it is unkown.');
                break;
        }

        let ele = document.getElementById(this.contentId);
        ele.innerHTML = this.silo.render();
        ele.classList.remove('init');
        ele.classList.add(loaderName);

        console.info('https://github.com/gruzilla/emanzipat/blob/master/codes.md#rendered');
    }

    loadBar() {
        new EmanziBar(this.barId, this.silo, this.storage);
    }
}