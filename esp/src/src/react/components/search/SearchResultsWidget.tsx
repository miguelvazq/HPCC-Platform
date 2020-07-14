import * as React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import * as ESPRequest from "../../../ESPRequest";
import {WsWorkunits} from "../../../WsWorkunits";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface SearchResultsProps {
    query: string
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer:{
            padding: 20
        },
        center: {
            position: "fixed",
            top: "50%",
            left: "50%"
        },
        table: {
            padding: "0, 20px",
            minWidth: "100%"
        },
        query: {
            padding: "10px 0 0 0"
        }
    })
)

export const SearchResultsList: React.FC<SearchResultsProps> = ({
    query,
}) => {
    const [loading, setLoading] = React.useState(true);
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState(query);
    const [searchResults, setSearchResults] = React.useState([]);


    React.useEffect(() => {
        WsWorkunits.WUQuery{(

        )}
        // ESPRequest.send("WsWorkunits", "WUQuery", params{Owner: {query}}).then(function (results) {
        //     console.log(results.WUQueryResponse.Workunits.ECLWorkunit)
        //     setSearchResults(results.WUQueryResponse.Workunits.ECLWorkunit);
        //     setLoading(false);
        // });
    }, [searchTerm]);


    return (
        <MuiThemeProvider theme={theme}>
            {loading ? <div className={classes.center}>
                <CircularProgress color="primary" /></div> : (
                    <>
                        <div className={classes.query}>
                            <Typography variant="h4">Query: {query}</Typography>
                        </div>
                        <TableContainer className={classes.tableContainer}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="caption">What</Typography></TableCell>
                                        <TableCell><Typography variant="caption">Who</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchResults.map((row) => (
                                        <TableRow key={row.Wuid}>
                                            <TableCell component="th" scope="row">{row.Wuid}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>

            )}
        </MuiThemeProvider>
    );
}