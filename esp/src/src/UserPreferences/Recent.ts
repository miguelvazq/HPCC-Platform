import { userKeyValStore } from "../KeyValStore";

const ws_store = userKeyValStore();

export function addToStack(key: string, data: any, expectedLength?: number, removeDups?: boolean) {
    let finalData;
    return new Promise(function(resolve, reject) {
        ws_store.get(key)
        .then(response => {
            if (response === "" || response === undefined) {
                ws_store.set(key, JSON.stringify([data]));
                resolve(finalData = JSON.stringify([data]));
            } else {
                const encodedData = JSON.parse(response);
                console.log(typeof(encodedData[0]))
                console.log(typeof(data));
                if (removeDups && encodedData[0] !== data) {
                    if (encodedData.length >= expectedLength) {
                        encodedData.pop();
                        encodedData.unshift(data);
                        ws_store.set(key, JSON.stringify(encodedData));
                        resolve(finalData = JSON.stringify([data]));
                    } else if (encodedData.length >= 1) {
                        encodedData.unshift(data);
                        ws_store.set(key,  JSON.stringify(encodedData));
                        resolve(finalData = JSON.stringify([data]));
                    }
                }
            }
        });
        return finalData;
    });
}
