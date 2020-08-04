import * as React from "react";
// import { makeStyles } from "@material-ui/core/styles"
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { theme } from '../theme';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles(theme => ({
//     container: {
//         display: "flex",
//         justifyContent: "space-between",
//         marginTop: "70px;"
//     },
//     center: {
//         position: "fixed",
//         top: "50%",
//         left: "50%"
//     },
//     nav: {
//         flexDirection: "column",
//         order: 1,
//         width: "240px",
//         alignItems: "center",

//     },
//     contentWrapper: {
//         flexDirection: "column",
//         order: 2,
//         marginLeft: "35px",
//         width: "100%",
//         alignItems: "center"
//     },
//     content: {
//         height: "100vh"
//     }
// }));

interface SearchResultProps {
    query: { [key: string]: any }
}

export const SearchResults: React.FunctionComponent<SearchResultProps> = ({
    query
}) => {
    //const classes = useStyles();
    //const [loading, setLoading] = React.useState(false);

    return (
        // <MuiThemeProvider theme={theme}>
        //     {loading ? <div className={classes.center}>
        //         <CircularProgress color="primary" /></div> : (
        //             <div>Hello from search</div>
        //         )}
        // </MuiThemeProvider>
        <div>Search Results: {query.SearchText}</div>
    );
};
