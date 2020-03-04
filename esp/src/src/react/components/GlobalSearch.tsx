import * as React from "react";
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import { Input, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "dojo/i18n";
// @ts-ignore
import * as nlsHPCC from "dojo/i18n!hpcc/nls/hpcc";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
);



interface GlobalSearchProps {
   term: string
}

export const GlobalSearch: React.FunctionComponent<GlobalSearchProps> = ({
    term
}) => {
    const classes = useStyles({});

    return (
        <div className={classes.root}>
        <ExpansionPanel><Input />
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header"></ExpansionPanelSummary>

        </ExpansionPanel>

        {/* // <Paper component="form" className={classes.root}>
        //     <InputBase
        //         className={classes.input}
        //         placeholder="Search Google Maps"
        //         inputProps={{ 'aria-label': 'search google maps' }}
        // />
        // </Paper> */}
        </div>
    )
};