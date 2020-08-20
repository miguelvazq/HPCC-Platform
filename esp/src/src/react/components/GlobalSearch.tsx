import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { InputBase, IconButton, Popper, ClickAwayListener, Paper, Grow, List, ListSubheader, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HistoryIcon from "@material-ui/icons/History";
import LaunchIcon from "@material-ui/icons/Launch";
import { DATA } from "src/data/components";
import { useGet } from "../hooks/useWsStore";
import { addToStack } from "../../UserPreferences/Recent";
import "dojo/i18n";
// @ts-ignore
import * as nlsHPCC from "dojo/i18n!hpcc/nls/hpcc";

interface GlobalSearchProps {
    username: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            minWidth: "28px"
        },
        halfWidthList: {
            width: "100%"
        },

        flexCenter: {
            display: "flex",
            width: "100%",
            flexDirection: "column"
        },
        userDetails: {
            marginTop: theme.spacing(1),
            padding: 0
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.common.white,
            marginLeft: 0,
            width: "auto",
            [theme.breakpoints.down("xs")]: {
                width: "100%",
                marginLeft: 0
            },
            [theme.breakpoints.up("sm")]: {
                width: "50%",
                marginLeft: 0
            }
        },
        inputRoot: {
            color: "black",
            width: "95%",
            padding: "3px 0",
            [theme.breakpoints.down("xs")]: {
                marginLeft: theme.spacing(1),
                width: "85%"
            },
            [theme.breakpoints.down("sm")]: {
                marginLeft: theme.spacing(1),
                width: "80%"
            },
            [theme.breakpoints.up("md")]: {
                marginLeft: theme.spacing(1),
                width: "88%"
            },
            [theme.breakpoints.up("lg")]: {
                marginLeft: theme.spacing(1),
                width: "90%"
            },
            [theme.breakpoints.up("xl")]: {
                marginLeft: theme.spacing(1),
                width: "95%"
            }
        },
        iconButton: {
            padding: 10
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
            transition: theme.transitions.create("width"),
            width: "80%"
        },
        popperRoot: {
            width: "100%"
        }
    })
);

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
    username
}) => {
    const classes = useStyles();
    const components = DATA;
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const prevOpen = React.useRef(open);
    const { data, loading } = useGet("GlobalRecentSearch");

    const handleToggle = () => {
        setOpen(true);
    };
    const handleSearchText = event => {
        if (event.target.value) {
            setSearchTerm(event.target.value);
        } else {
            setSearchTerm("");
            setOpen(false);
            setSearchResults([]);
        }
    };
    const handleGlobalSearchText = () => {
        if (searchTerm) {
            addToStack("GlobalRecentSearch", { Term: searchTerm }, 5, true).then(function (val) {
                if (val) {
                    setSearchTerm("");
                }
            });
        }
    };
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    const handleAutoCompleteClick = () => {
        setOpen(false);
        setSearchResults([]);
        setSearchTerm("");
    };

    React.useEffect(() => {
        const autoCompleteSearchTerms = components.components;
        if (searchTerm !== "") {
            setOpen(true);
            const results = autoCompleteSearchTerms.filter(name => (name.name.toLowerCase().includes(searchTerm.toLowerCase())));
            setSearchResults(results);
        }
    }, [searchTerm]);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <div className={classes.search}>
                <InputBase
                    placeholder={nlsHPCC.SearchComponents}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onClick={handleToggle}
                    onChange={handleSearchText}
                    ref={anchorRef}
                    value={searchTerm}
                />
                <IconButton type="submit" disabled={searchTerm.length === 0} href={"#/search/" + searchTerm} onMouseDown={handleGlobalSearchText} className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            <Popper
                className={classes.popperRoot}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement={"bottom"}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                    >
                        <Paper className={classes.userDetails}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div className={classes.flexCenter}>
                                    {data.length > 0 ? (
                                        <List
                                            component="ul"
                                            aria-labelledby="nested-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">{loading ? (nlsHPCC.Loading) : (nlsHPCC.RecentSearches)}</ListSubheader>
                                            }
                                        >
                                            {data.map((item, idx) => (
                                                <ListItem dense button className={classes.halfWidthList} key={idx}>
                                                    <ListItemIcon className={classes.listItem}>
                                                        <HistoryIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Term} />
                                                </ListItem>
                                            ))}

                                        </List>
                                    ) : ""}
                                    {searchResults.length > 0 ? (
                                        <List dense disablePadding
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">{nlsHPCC.Components}</ListSubheader>
                                            }
                                        >
                                            {searchResults.map((item, idx) => (
                                                <ListItem button component="a" dense key={idx} role={undefined} href={item.href} onClick={() => handleAutoCompleteClick()} className={classes.halfWidthList}>
                                                    <ListItemIcon>
                                                        <LaunchIcon color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText id={item.name} primary={item.name} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : ""}
                                </div>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
        </>
    );
};
