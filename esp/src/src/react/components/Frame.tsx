import * as React from "react";
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from '@material-ui/core/CircularProgress';
import { MainList } from "./NavigationMenu";
import { Body } from "./Body";
import { UtilityBar } from "./UtilityBar";
import { UserAccountContext } from "../hooks/userContext";
import * as ESPRequest from "../../ESPRequest";

declare const dojoConfig;

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "70px;"
    },
    center: {
        position: "fixed", /* or absolute */
        top: "50%",
        left: "50%",
        borderColor: "red"
    },
    nav: {
        flexDirection: "column",
        order: 1,
        width: "240px",
        alignItems: "center",

    },
    contentWrapper: {
        flexDirection: "column",
        order: 2,
        marginLeft: "35px",
        width: "100%",
        alignItems: "center"
    },
    content: {
        height: "100vh"
    }
}));

export function Frame() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true)
    const [mainWidget, setMainWidget] = React.useState("ActivityWidget");
    const [userAccount, setUserAccount] = React.useState({});

    React.useEffect(() => {
        ESPRequest.send("ws_account", "MyAccount").then(function (user) {
            setUserAccount(user.MyAccountResponse);
            dojoConfig.username = user.MyAccountResponse.username;
            setLoading(false);
        });
    }, []);

    const selectedWidgetCallback = (widget) => {
        setMainWidget(widget);
    }

    return (
        loading ? <div className={classes.center}><CircularProgress color="primary" /></div> : (
            <UserAccountContext.Provider value={{ userAccount, setUserAccount }}>
                <UtilityBar />
                <div className={classes.container}>
                    <div className={classes.nav}>
                        <MainList getWidgetName={selectedWidgetCallback} />
                    </div>
                    <div className={classes.contentWrapper}>
                        <Body widgetClassID={mainWidget} params={{}} />
                    </div>
                </div>
            </UserAccountContext.Provider>
        )
    );
}
