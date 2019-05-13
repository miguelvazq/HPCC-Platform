import * as declare from "dojo/_base/declare";
import * as xhr from "dojo/request/xhr";
import * as cookie from "dojo/cookie";
import * as ESPUtil from "./ESPUtil";
import * as topic from "dojo/topic";
import * as LockDialogWidget from "../eclwatch/LockDialogWidget"

declare const dojoConfig;

export var SessionHelper = declare(null, {
    
    constructor() {
        this.espTimeoutSeconds = cookie("ESPSessionTimeoutSeconds") || 600,
        this.sessionIsActive = this.espTimeoutSeconds > -1;
        
        if (this.sessionIsActive) {
            cookie("Status", "Unlocked");
            cookie("ECLWatchUser", "true");
            
            this.IDLE_TIMEOUT = this.espTimeoutSeconds * 1000,
            this.SESSION_RESET_FREQ = 30 * 1000,
            this._prevReset = Date.now(),
            this.monitorLockClick = new ESPUtil.MonitorLockClick();
            this.session = new ESPUtil.LocalStorage();
            
        }
    },

    _resetESPTime(evt) {
        if (Date.now() - this._prevReset > this.SESSION_RESET_FREQ) {
            this._prevReset = Date.now();
            xhr("esp/reset_session_timeout", {
                method: "post"
            }).then(function (data) {
            });
        }
    },

    initSessionMgmt() {
        if (this.sessionIsActive) {
            this.monitorLockClick.on("unlocked", function () {
                this.idleWatcher.start();
            });
            this.monitorLockClick.on("locked", function () {
                this.idleWatcher.stop();
            });
            this.monitorLockClick.unlocked();
        } else if (cookie("ECLWatchUser")) {
            window.location.replace(dojoConfig.urlInfo.basePath + "/Login.html");
        }
    },

    listenForStatusChange() {
        topic.subscribe("hpcc/session_management_status", function (publishedMessage) {
            if (publishedMessage.status === "Unlocked") {
                this.monitorLockClick.unlocked();
            } else  if (publishedMessage.status === "Locked") {
                this.monitorLockClick.locked();
            } else if (publishedMessage.status === "DoIdle") {
                idleWatcher.fireIdle();
            }
        })
    }
});

