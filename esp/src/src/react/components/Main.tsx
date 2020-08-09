import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Activities } from "./activities/Activities";
import { Workunits, WorkunitsProps } from "./activities/Workunits";

import "dojo/i18n";
// @ts-ignore
import * as nlsHPCC from "dojo/i18n!hpcc/nls/hpcc";

export const Main: React.FunctionComponent<WorkunitsProps> = (props) => {
    return <Grid container justify="center" spacing={3} style={{ padding: "24px" }} >
        <Workunits {...props} />
        <Activities />
    </Grid>;
};