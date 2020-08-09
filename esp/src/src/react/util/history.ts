import UniversalRouter from "universal-router";
import { parse, stringify } from "query-string";
import { hashSum } from "@hpcc-js/util";

let g_router: UniversalRouter;

export function initialize(routes) {
    g_router = new UniversalRouter(routes);
    return g_router;
}

function parseHash(hash: string): HistoryLocation {
    if (hash[0] !== "#") {
        return {
            pathname: "/",
            search: "",
            id: hashSum("#/")
        };
    }

    const parts = hash.substring(1).split("?");
    return {
        pathname: parts[0],
        search: parts.length > 1 ? `?${parts[1]}` : "",
        id: hashSum(hash)
    };
}

export function parseSearch(_: string) {
    if (_[0] !== "?") return {};
    return parse(_.substring(1), { parseBooleans: true, parseNumbers: true });
}

interface HistoryLocation {
    pathname: string;
    search: string;
    id: string;
}

export type ListenerCallback<S extends object = object> = (location: HistoryLocation, action: string) => void;

const globalHistory = globalThis.history;

class History<S extends object = object> {

    location: HistoryLocation = {
        pathname: "/",
        search: "",
        id: hashSum("#/")
    };
    state: S = {} as S;

    constructor() {
        this.location = parseHash(document.location.hash);

        window.addEventListener("hashchange", ev => {
            console.log("hashchange: " + document.location);
            const prevID = this.location.id;
            this.location = parseHash(document.location.hash);
            if (prevID !== this.location.id) {
                this.state = {} as S;
            }
            this.broadcast("HASHCHANGE");
        });

        window.addEventListener("popstate", ev => {
            console.log("popstate: " + document.location + ", state: " + JSON.stringify(ev.state));
            this.state = ev.state;
        });
    }

    push(to: { pathname?: string, search?: string }, state?: S) {
        console.log("pushing", to, state);
        const newHash = `#${to.pathname || this.location.pathname}${to.search || ""}`;
        globalHistory.pushState(state, "", newHash);
        this.location = parseHash(newHash);
        this.broadcast("PUSH");
    }

    replace(to: { pathname?: string, search?: string }, state?: S) {
        console.log("replaceing", to, state);
        const newHash = `#${to.pathname || this.location.pathname}${to.search || ""}`;
        globalHistory.replaceState(state, "", newHash);
        this.location = parseHash(newHash);
        this.broadcast("REPLACE");
    }

    _listenerID = 0;
    _listeners: { [id: number]: ListenerCallback } = {};
    listen(callback: ListenerCallback) {
        const id = ++this._listenerID;
        this._listeners[id] = callback;
        return () => {
            delete this._listeners[id];
        };
    }

    broadcast(action: string) {
        for (const listener of Object.values(this._listeners)) {
            listener(this.location, action);
        }
    }
}

export const hashHistory = new History<any>();

export function pushSearch(_: object, state?: any) {
    const search = stringify(_);
    hashHistory.push({
        search: search ? "?" + search : ""
    }, state);
}

export function updateSearch(_: object, state?: any) {
    const search = stringify(_);
    hashHistory.replace({
        search: search ? "?" + search : ""
    }, state);
}

export function pushParam(key: string, val?: string | string[] | number | boolean, state?: any) {
    const params = parseSearch(hashHistory.location.search);
    if (val === undefined) {
        delete params[key];
    } else {
        params[key] = val;
    }
    pushSearch(params, state);
}

export function updateParam(key: string, val?: string | string[] | number | boolean, state?: any) {
    const params = parseSearch(hashHistory.location.search);
    if (val === undefined) {
        delete params[key];
    } else {
        params[key] = val;
    }
    updateSearch(params, state);
}
