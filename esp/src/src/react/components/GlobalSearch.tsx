import * as React from 'react';
import { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles, ThemeProvider } from '@material-ui/core/styles';
import { Box, IconButton, Drawer, Typography, Container, FormGroup, FormControl, FormControlLabel, FormLabel, TextField, Checkbox, List, ListItem, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import HistoryIcon from '@material-ui/icons/History';
import LaunchIcon from '@material-ui/icons/Launch';
import { theme } from '../theme';
import DATA from '../../data/components.js';
import { useGet } from "../hooks/useWsStore";

interface GlobalSearchProps {
    sendData: any;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        search: {
            marginLeft: theme.spacing(2),
            color: theme.palette.common.white,
            alignItems: 'center',
            justifyContent: 'center'
        },
        checkBox: {
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
        closeModal: {
            '&:hover': {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.primary
            }
        },
        drawer: {

        },
        text: {

        },
        searchBox: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
        },
        boxContainer: {
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
        },
        resultsBox: {
            width: "50%",
            paddingBottom: theme.spacing(5),
            paddingRight: theme.spacing(5)
        },
        modal: {
            display: 'flex',
            height: '100%',
            alignItems: 'left',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: theme.spacing(5, 0)
        },
        searchInput: {
            display: 'flex',
            alignItems: 'left',
            width: '100%',
            flexDirection: 'row',
            padding: theme.spacing(0,5,5,0)
        },
        searchOptions: {
            margin: theme.spacing(2,0,2,0),
            color: theme.palette.primary.main
            // paddingTop: theme.spacing(5)
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRoot: {
            color: 'inherit'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch'
            }
        },
        searchButton: {
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.common.white
            },
            marginLeft: theme.spacing(1),
        }
    })
)

export const GlobalSearch: React.FC<GlobalSearchProps> = (props) => {
    //hooks
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const { data, loading } = useGet("RecentGlobalSearch");
    const [searchResults, setSearchResults] = React.useState([]);
    const [checkBoxState, setCheckBoxState] = React.useState({dfu: true, ecl: true, file: true, query: true }); //user: true, wuid: true

    //const {data, loading} = useGet(ws_key, filter);

    //variables
    const { dfu, ecl, file, query } = checkBoxState; //user, wuid
    const components = DATA;

    React.useEffect(() => {
        const autoCompleteSearchTerms = components.components;
        if (searchTerm !== "") {
            const results = autoCompleteSearchTerms.filter(name => (name.name.toLowerCase().includes(searchTerm.toLowerCase())));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    },[searchTerm]);
    console.log(data)
    console.log(loading)

    //handlers
    const handleSearchText = event => {
        setSearchTerm(event.target.value)
    }
    const handleDrawerClose = () => {
        setOpen(false);
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    }
    const handleCheckBox = (event) => {
        setCheckBoxState({...checkBoxState, [event.target.name]: event.target.checked });
    }
    const detectSearchPress = (event) => {
        addToRecentSearches(event.target.value);
    }
    const detectEnter = (event) => {
        event.key === "Enter" ?  submitForm(event.target.value) : ""
        addToRecentSearches(event.target.value);
    }
    const detectClick = (event) => {
        handleDrawerClose();
        //props.sendData(event.target.id);
    }
    const submitForm = (value) => {
        handleDrawerClose();
        //props.sendData("SearchResultsWidget");
    }

    const addToRecentSearches = (value) => {
        
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.search}>
                <IconButton aria-label="search ecl watch" color="inherit" onClick={handleDrawerOpen}>
                    <SearchIcon fontSize="default" />
                </IconButton>
            </div>
            <Drawer
                className={classes.drawer}
                anchor="top"
                open={open}
            >
                <Container maxWidth="lg">
                    <div className={classes.modal} role="presentation">
                        <div className={classes.text}>
                            <Typography variant="h4">Search</Typography>
                            <Typography variant="subtitle1">Search for components, WUIDs, Users, Logical files, DFU Workunits.</Typography>
                        </div>
                        <div>
                            <IconButton onClick={handleDrawerClose} className={classes.closeModal}><CloseIcon color="primary"></CloseIcon></IconButton>
                        </div>
                    </div>
                    <div className={classes.searchBox}>
                        <TextField id="outlined-basic" label="Search ECL Watch" variant="outlined" fullWidth value={searchTerm} onKeyPress={detectEnter} onChange={handleSearchText} />
                        <Button className={classes.searchButton} color="secondary" variant="contained" onClick={detectSearchPress}>Search</Button>
                    </div>
                    <div className={classes.searchInput}>
                        <FormControl fullWidth>
                            <FormLabel className={classes.searchOptions} component="legend">To filter by specific area select an option otherwise, search globally.</FormLabel>
                                <FormGroup row>
                                    <FormControlLabel control={<Checkbox disableRipple checked={dfu} className={classes.checkBox} name="dfu" value="dfu:" onChange={handleCheckBox} />} label="DFU Workunits"/>
                                    <FormControlLabel control={<Checkbox disableRipple checked={ecl} className={classes.checkBox} name="ecl" value="ecl:" onChange={handleCheckBox} />} label="ECL"/>
                                    <FormControlLabel control={<Checkbox disableRipple checked={file} className={classes.checkBox} name="file" value="file:" onChange={handleCheckBox} />} label="Logical Files"/>
                                    <FormControlLabel control={<Checkbox disableRipple checked={file} className={classes.checkBox} name="query" value="query:" onChange={handleCheckBox} />} label="Query"/>
                                </FormGroup>
                        </FormControl>
                    </div>
                    <div className={classes.boxContainer}>
                        <Box className={classes.resultsBox}>
                            <Typography variant="h6">Recent searches</Typography>
                            <List dense disablePadding>
                                <ListItem onClick={detectClick} role={undefined} dense button divider>
                                <ListItemIcon>
                                    <HistoryIcon color="primary"/>
                                </ListItemIcon>
                                    <ListItemText id="1" primary="one" />
                                </ListItem>
                                <ListItem onClick={detectClick} role={undefined} dense button divider>
                                <ListItemIcon>
                                    <HistoryIcon color="primary"/>
                                </ListItemIcon>
                                    <ListItemText id="2" primary="two" />
                                </ListItem>
                                <ListItem onClick={detectClick} role={undefined} dense button divider>
                                <ListItemIcon>
                                    <HistoryIcon color="primary"/>
                                </ListItemIcon>
                                    <ListItemText id="3" primary="three" />
                                </ListItem>
                                <ListItem onClick={detectClick} role={undefined} dense button divider>
                                <ListItemIcon>
                                    <HistoryIcon color="primary"/>
                                </ListItemIcon>
                                    <ListItemText id="4" primary="four" />
                                </ListItem>
                                <ListItem onClick={detectClick} role={undefined} dense button divider>
                                <ListItemIcon>
                                    <HistoryIcon color="primary"/>
                                </ListItemIcon>
                                    <ListItemText id="5" primary="five" />
                                </ListItem>
                            </List>
                        </Box>
                        <Box className={classes.resultsBox}>
                            <Typography variant="h6">Components</Typography>
                                {searchResults.length > 0 ? (
                                    <List dense disablePadding>
                                        {searchResults.map((item, idx) => (
                                            <ListItem key={idx} role={undefined} dense button divider onClick={detectClick}>
                                                <ListItemIcon>
                                                    <LaunchIcon color="primary"/>
                                                </ListItemIcon>
                                                <ListItemText id={item.name} primary={item.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : <Typography variant="subtitle1">No components that match your search.</Typography> }
                        </Box>
                    </div>
                </Container>
            </Drawer>
        </ThemeProvider>
    )
}