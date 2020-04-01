import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    typography: {
        fontSize: 15
    },
    palette: {
      primary: {
          //main: "#1a9bd7",
          main: "rgba(0,47,108,1)",
          light: "rgba(0,47,108,0.8)",
          //light: "#66ccff",
          dark: "#006da5",
          contrastText: "#f5f5f5"
      },
      secondary: {
          main: "#ED1C24",
          //main: "rgba(255,163,0,1)",
          light: "rgba(255,163,0,0.8)",
          dark: "#1c313a",
          contrastText: "#fff"
      }
    },
    overrides: {  // lets make everything look the same. if we want to overwrite use the useStyles hook inside the component
        MuiStepIcon: {
            root: {
                color: "rgba(0, 0, 0, 0.38)"
            },
            completed: {
                color: "#1a9bd7"
            }
        },
        MuiTableContainer: {
            root: {
                margin: "20px 0px"
            }
        },
        // MuiIconButton: {
        //     root: {
        //         "color": "white",
        //         "&:hover": {
        //             background: "primary",
        //             color: "white",
        //             boxShadow: "none"
        //         }
        //     }
        // },
        // MuiButton: {
        //     root: {
        //         "&:hover": {
        //             backgroundColor: "hsla(0,0%,100% 0.7)",
        //             boxShadow: "none"
        //         }
        //     }
        // },
        MuiTableCell: {
            head: {
               fontWeight: 600,
               width: "50%"
            }
        }
    }
});
