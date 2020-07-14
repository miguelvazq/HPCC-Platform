import * as React from "react";
import { DojoAdapter } from "./DojoAdapter";
import { Activities } from "./Activities";
import { SearchResultsList } from './search/SearchResultsWidget';

export interface Body {
    widgetClassID: { [widget: string]: any}
}

export const Body: React.FunctionComponent<Body> = ({
    widgetClassID
}) => {

    switch (widgetClassID.widget) {
        case "ActivityWidget":
            return <Activities />
        case "SearchResultsWidget":
            return <SearchResultsList query={widgetClassID.query}/>
        default:
            return <DojoAdapter widgetClassID={{widget: widgetClassID.widget, params: widgetClassID.params}} />
    }
}