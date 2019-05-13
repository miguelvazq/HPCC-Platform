import * as declare from "dojo/_base/declare";
// import * as lang from "dojo/_base/lang";
// import * as dom from "dojo/dom";
import * as xhr from "dojo/_base/xhr";
import * as cookie from "dojo/cookie";
//import * as ESPUtil from "./ESPUtil";



export var Session = declare(null, {

    espTimeoutSeconds: cookie("ESPSessionTimeoutSeconds") || 600,
    IDLE_TIMEOUT: this.espTimeoutSeconds * 1000,
    SESSION_RESET_FREQ: 30 * 1000,
    idleWatcher: null,
    _prevReset: Date.now(),
    sessionIsActive: this.espTimeoutSeconds,

    constructor() {
        this.status = "Unlocked";
        this.user = "";
        
    },

    verifySession() {

    }

    checkIfSessionsAreActive() {
        if (cookie("ESPSessionTimeoutSeconds")) {
            cookie("Status", "Unlocked");
            cookie("ECLWatchUser", "true");
        }
    },

    sessionIsConfigured(){
        return (this.sessionIsActive > -1)
    },

    _resetESPTime(evt) {
        if (Date.now() - this._prevReset > this.SESSION_RESET_FREQ) {
            this._prevReset = Date.now();
            xhr("esp/reset_session_timeout", {
                method: "post"
            }).then(function (data) {
            });
        }
    }



});


export function UpdateFromStorage (msg) {
    var context = this;
    if (msg.event.newValue === "logged_out") {
        window.location.reload();
    } else if (msg.event.newValue === "Locked") {
        context._onShowLock();
    } else if (msg.event.newValue === "Unlocked" || msg.event.oldValue === "Locked") {
        context._onHideLock();
    }
}


