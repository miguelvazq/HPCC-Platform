import * as React from "react";
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import StorageIcon from "@material-ui/icons/Storage";
import PublicIcon from "@material-ui/icons/Public";
import AssessmentIcon from "@material-ui/icons/Assessment";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MapIcon from "@material-ui/icons/Map";
import BugReportIcon from "@material-ui/icons/BugReport";
import ForumIcon from "@material-ui/icons/Forum";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import InfoIcon from "@material-ui/icons/Info";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import HomeIcon from "@material-ui/icons/Home";

interface MainList {
    onSelect: (widgetID: string) => void;
}

export const MainList: React.FunctionComponent<MainList> = ({
    onSelect
}) => {

    return <List>
        <ListItem button title="Main Page" onClick={() => onSelect("ActivityWidget")}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Main Page" />
        </ListItem>
        <ListItem button title="ECL" onClick={() => onSelect("WUQueryWidget")}>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="ECL" />
        </ListItem>
        <ListItem button title="Files" onClick={() => onSelect("DFUQueryWidget")}>
            <ListItemIcon>
                <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Files" />
        </ListItem>
        <ListItem button title="Published Queries" onClick={() => onSelect("QuerySetQueryWidget")}>
            <ListItemIcon>
                <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Published Queries" />
        </ListItem>
        <ListItem button title="Operations" onClick={() => onSelect("TopologyWidget")}>
            <ListItemIcon>
                <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Operations" />
        </ListItem>

    </List>
};

export const listItemsResources = (
    <div>
        <ListSubheader inset>Resources</ListSubheader>
        <ListItem button title="Release Notes" onClick={() => { window.open("https://hpccsystems.com/download/release-notes") }}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Release Notes" />
        </ListItem>
        <ListItem button title="Documentation" onClick={() => { window.open("https://hpccsystems.com/training/documentation") }}>
            <ListItemIcon>
                <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Documentation" />
        </ListItem>
        <ListItem button title="About">
            <ListItemIcon>
                <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItem>
        <ListItem button title="Configuration">
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Configuration" />
        </ListItem>
        <ListItem button title="Red Book" onClick={() => { window.open("https://wiki.hpccsystems.com/x/fYAb") }}>
            <ListItemIcon>
                <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Red Book" />
        </ListItem>
        <ListItem button title="Forums" onClick={() => { window.open("https://hpccsystems.com/bb/") }}>
            <ListItemIcon>
                <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="Forums" />
        </ListItem>
        <ListItem button title="Issue Reporting" onClick={() => { window.open("https://track.hpccsystems.com/issues") }}>
            <ListItemIcon>
                <BugReportIcon />
            </ListItemIcon>
            <ListItemText primary="Issue Reporting" />
        </ListItem>
        <ListItem button title="Transition Guide" onClick={() => { window.open("https://wiki.hpccsystems.com/display/hpcc/HPCC+ECL+Watch+5.0+Transition+Guide") }}>
            <ListItemIcon>
                <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Transition Guide" />
        </ListItem>
    </div>
);