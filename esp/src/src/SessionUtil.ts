
import * as Evented from "dojo/Evented";
import * as lang from "dojo/_base/lang";
import * as ESPRequest from "./ESPRequest";

declare const dojo;

export var LocalStorage = dojo.declare([Evented], {
    constructor: function () {
        var context = this;
        if (typeof Storage !== void(0)) {
            window.addEventListener('storage', function (event) {
                context.emit('storageUpdate', {event});
            });
        } else {
            console.log("Browser doesn't support multi-tab communication");
        };
    },

    setItem: function (key, value) {
        localStorage.setItem(key, value);
    },
    removeItem: function (key) {
        localStorage.removeItem(key);
    },
    getItem: function (key) {
        localStorage.getItem(key)
    },
    clear: function () {
        localStorage.clear();
    }
});

export function Login(params) {
    lang.mixin(params, {
        handleAs: "json"
    });
    return ESPRequest.send("esp", "login", params);
}
