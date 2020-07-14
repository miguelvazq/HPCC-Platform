import * as registry from "dijit/registry";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { resolve } from "../../Utility";
import "dojo/i18n";
// @ts-ignore
import * as nlsHPCC from "dojo/i18n!hpcc/nls/hpcc";

export interface DojoProps {
    widgetClassID: { [widget: string]: any}
    onWidgetMount?: (widget) => void;
}

export interface DojoState {
    uid: number;
    widgetClassID: { [widget: string]: any}
    widget: any;
}

let g_id = 0;
export const DojoAdapter: React.FunctionComponent<DojoProps> = ({
    widgetClassID,
    onWidgetMount
}) => {

    const myRef = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        const uid = ++g_id; // Incrementing the ID should not really be needed  ---

        const elem = document.createElement("div");
        myRef.current.innerText = "";
        myRef.current.appendChild(elem);

        let widget = undefined;
        resolve(widgetClassID.widget, WidgetClass => {
            if (widget === undefined) { //  Test for race condition  --
                widget = new WidgetClass({
                    id: `dojo-component-widget-${uid}`,
                    style: {
                        margin: "0px",
                        padding: "0px",
                        width: "100%",
                        height: "100%"
                    }
                });
                widget.placeAt(elem, "replace");
                widget.startup();
                widget.resize();
                if (widget.init) {
                    widget.init(widgetClassID.params || {});
                }

                if (onWidgetMount) {
                    onWidgetMount(widget);
                }
            }
        });

        return () => {
            if (widget) {
                widget.destroyRecursive(true);

                //  Should not be needed  ---
                registry.toArray().filter(w => w.id.indexOf(`dojo-component-widget-${uid}`) === 0).forEach(w => {
                    w.destroyRecursive(true);
                });
                //  ---

                const domNode: HTMLElement = ReactDOM.findDOMNode(myRef.current);
                domNode.innerHTML = "";
            }
            widget = null;  //  Avoid race condition  ---
        }
    }, [widgetClassID.widget]);

    return <div ref={myRef} style={{ width: "100%", height: "800px" }}>{nlsHPCC.Loading} {widgetClassID.widget}...</div>;
};
