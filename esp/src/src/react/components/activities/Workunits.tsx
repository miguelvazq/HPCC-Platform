import * as React from "react";
import { WorkunitsService, WUQuery } from "@hpcc-js/comms";
import { Area, Column, Pie, Bar } from "@hpcc-js/chart";
import { chain, filter, group, map, sort } from "@hpcc-js/dataflow";
import { Grid, Card, CardHeader, Select, MenuItem, Chip } from "@material-ui/core";
import Lock from "@material-ui/icons/LockOutlined";
import { VizInstanceAdapter } from "../VizAdapter";
import { icons } from "../../util/table";
import { AutoSizeTable } from "../AutoSizeTable";

import "dojo/i18n";
// @ts-ignore
import * as nlsHPCC from "dojo/i18n!hpcc/nls/hpcc";

const service = new WorkunitsService({ baseUrl: "" });

const wuidToDate = (wuid: string) => `${wuid.substr(1, 4)}-${wuid.substr(5, 2)}-${wuid.substr(7, 2)}`;

interface WorkunitEx extends WUQuery.ECLWorkunit {
    Day: string;
}

export const Workunits: React.FunctionComponent = () => {

    const [lastNDays, setLastNDays] = React.useState<number>(7);
    const [workunits, setWorkunits] = React.useState<WorkunitEx[]>([]);
    const [cluster, setCluster] = React.useState(undefined);
    const [owner, setOwner] = React.useState(undefined);
    const [state, setState] = React.useState(undefined);
    const [_protected, setProtected] = React.useState(undefined);
    const [day, setDay] = React.useState(undefined);

    React.useEffect(() => {
        const end = new Date();
        const start = new Date();
        //start.setMonth(start.getMonth() - 1);
        start.setDate(start.getDate() - lastNDays);
        service.WUQuery({
            StartDate: start.toISOString(),
            EndDate: end.toISOString(),
            PageSize: 999999
        }).then(response => {
            setWorkunits([...map(response.Workunits.ECLWorkunit, (row: WUQuery.ECLWorkunit) => ({ ...row, Day: wuidToDate(row.Wuid) }))]);
        });
    }, [lastNDays]);

    //  Cluster Chart ---
    const clusterChart = React.useRef(
        new Bar()
            .columns(["Cluster", "Count"])
            .on("click", (row, col, sel) => {
                setCluster(sel ? row.Cluster : undefined);
            })
    ).current;

    const clusterPipeline = chain(
        filter(row => state === undefined || row.State === state),
        filter(row => owner === undefined || row.Owner === owner),
        filter(row => day === undefined || row.Day === day),
        filter(row => _protected === undefined || row.Protected === _protected),
        group((row: WUQuery.ECLWorkunit) => row.Cluster),
        map(row => [row.key, row.value.length] as [string, number]),
        sort((l, r) => l[0].localeCompare(r[0])),
    );

    clusterChart
        .data([...clusterPipeline(workunits)])
        ;

    //  Owner Chart ---
    const ownerChart = React.useRef(
        new Column()
            .columns(["Owner", "Count"])
            .on("click", (row, col, sel) => {
                setOwner(sel ? row.Owner : undefined);
            })
    ).current;

    const ownerPipeline = chain(
        filter(row => cluster === undefined || row.Cluster === cluster),
        filter(row => state === undefined || row.State === state),
        filter(row => day === undefined || row.Day === day),
        filter(row => _protected === undefined || row.Protected === _protected),
        group((row: WUQuery.ECLWorkunit) => row.Owner),
        map(row => [row.key, row.value.length] as [string, number]),
        sort((l, r) => l[0].localeCompare(r[0])),
    );

    ownerChart
        .data([...ownerPipeline(workunits)])
        ;

    //  State Chart ---
    const stateChart = React.useRef(
        new Pie()
            .columns(["State", "Count"])
            .on("click", (row, col, sel) => {
                setState(sel ? row.State : undefined);
            })
    ).current;

    const statePipeline = chain(
        filter(row => cluster === undefined || row.Cluster === cluster),
        filter(row => owner === undefined || row.Owner === owner),
        filter(row => day === undefined || row.Day === day),
        filter(row => _protected === undefined || row.Protected === _protected),
        group((row: WUQuery.ECLWorkunit) => row.State),
        map(row => [row.key, row.value.length])
    );

    stateChart
        .data([...statePipeline(workunits)])
        ;

    //  Protected Chart ---
    const protectedChart = React.useRef(
        new Pie()
            .columns(["Protected", "Count"])
            .on("click", (row, col, sel) => {
                setProtected(sel ? row.Protected === "true" : undefined);
            })
    ).current;

    const protectedPipeline = chain(
        filter(row => cluster === undefined || row.Cluster === cluster),
        filter(row => owner === undefined || row.Owner === owner),
        filter(row => day === undefined || row.Day === day),
        group((row: WorkunitEx) => "" + row.Protected),
        map(row => [row.key, row.value.length])
    );

    protectedChart
        .data([...protectedPipeline(workunits)])
        ;

    //  Day Chart ---
    const dayChart = React.useRef(
        new Area()
            .columns(["Day", "Count"])
            .xAxisType("time")
            .interpolate("cardinal")
            // .xAxisTypeTimePattern("")
            .on("click", (row, col, sel) => {
                setDay(sel ? row.Day : undefined);
            })
    ).current;

    const dayPipeline = chain(
        filter(row => cluster === undefined || row.Cluster === cluster),
        filter(row => owner === undefined || row.Owner === owner),
        filter(row => state === undefined || row.State === state),
        filter(row => _protected === undefined || row.Protected === _protected),
        group(row => row.Day),
        map(row => [row.key, row.value.length] as [string, number]),
        sort((l, r) => l[0].localeCompare(r[0])),
    );

    dayChart
        .data([...dayPipeline(workunits)])
        ;

    //  Table ---
    const tablePipeline = chain(
        filter(row => cluster === undefined || row.Cluster === cluster),
        filter(row => owner === undefined || row.Owner === owner),
        filter(row => state === undefined || row.State === state),
        filter(row => _protected === undefined || row.Protected === _protected),
        filter(row => day === undefined || row.Day === day)
    );

    //  --- --- ---
    return <Grid container justify="center" spacing={3} >
        <Grid item xs={3}>
            <Card>
                <CardHeader title="State" action={
                    state !== undefined ? <Chip label={state} clickable color="primary" onDelete={() => setState(undefined)} /> : undefined
                } />
                <VizInstanceAdapter widget={stateChart} height="240px" />
            </Card>
        </Grid>
        <Grid item xs={6}>
            <Card>
                <CardHeader mx={2} title="Day" action={
                    <>
                        {day !== undefined ? <Chip label={day} clickable color="primary" onDelete={() => setDay(undefined)} /> : undefined}
                        <Select
                            labelId="lastNDays-label"
                            id="lastNDays-select"
                            value={lastNDays}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setLastNDays(event.target.value as number);
                            }}
                        >
                            <MenuItem value={1}>Day</MenuItem>
                            <MenuItem value={2}>2 Days</MenuItem>
                            <MenuItem value={3}>3 Days</MenuItem>
                            <MenuItem value={7}>Week</MenuItem>
                            <MenuItem value={14}>2 Weeks</MenuItem>
                            <MenuItem value={21}>3 Weeks</MenuItem>
                            <MenuItem value={31}>Month</MenuItem>
                        </Select>
                    </>
                } />
                <VizInstanceAdapter widget={dayChart} height="240px" />
            </Card>
        </Grid>
        <Grid item xs={3}>
            <Card>
                <CardHeader title="Protected" action={
                    _protected !== undefined ? <Chip label={"" + _protected} clickable color="primary" onDelete={() => setProtected(undefined)} /> : undefined
                } />
                <VizInstanceAdapter widget={protectedChart} height="240px" />
            </Card>
        </Grid>
        <Grid item xs={8}>
            <Card>
                <CardHeader title="Owner" action={
                    owner !== undefined ? <Chip label={owner} clickable color="primary" onDelete={() => setOwner(undefined)} /> : undefined
                } />
                <VizInstanceAdapter widget={ownerChart} height="240px" />
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card>
                <CardHeader title="Cluster" action={
                    cluster !== undefined ? <Chip label={cluster} clickable color="primary" onDelete={() => setCluster(undefined)} /> : undefined
                } />
                <VizInstanceAdapter widget={clusterChart} height="240px" />
            </Card>
        </Grid>
        <Grid item xs={12}>
            <Card style={{ height: "480px" }}>
                <AutoSizeTable
                    title={nlsHPCC.Workunits}
                    icons={icons}
                    columns={[
                        {
                            title: <Lock />, field: "Protected", width: 32,
                            render: row => row.Protected ? <Lock /> : undefined
                        },
                        {
                            title: nlsHPCC.WUID, field: "Wuid", width: 180,
                            render: rowData => <a href={`#/workunits/${rowData.Wuid}`}>{rowData.Wuid}</a>
                        },
                        { title: nlsHPCC.Owner, field: "Owner", width: 90 },
                        { title: nlsHPCC.JobName, field: "Jobname", width: 500 },
                        { title: nlsHPCC.Cluster, field: "Cluster", width: 90 },
                        { title: nlsHPCC.RoxieCluster, field: "RoxieCluster", width: 99 },
                        { title: nlsHPCC.State, field: "State", width: 90 },
                        { title: nlsHPCC.TotalClusterTime, field: "TotalClusterTime", width: 117 },
                    ].map(row => ({ ...row, cellStyle: { padding: "0.0em" } }))}
                    data={[...tablePipeline(workunits)]}
                    options={{
                        exportButton: true,
                        selection: true,
                        fixedColumns: {
                            left: 2
                        }
                    }}
                />
            </Card>
        </Grid>
    </Grid>;
};