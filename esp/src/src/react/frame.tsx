import * as React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { UtilityBar } from "./components/UtilityBar";
import { DojoComponent } from "./dojoComponent";
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core';

declare const dojoConfig;

interface FrameProps {
	//username: string
}

export const Frame: React.FC<FrameProps> = (props) => {
    const [widgetValue, setWidgetValue ] = React.useState("ActivityWidget");

    const divStyle = {
        width: "100%",
        height: "800px",
        paddingTop: "40px",
        marginTop: "40px"
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                {/* <UtilityBar sendData={getSearchData} /> */}
                <UtilityBar  />
                <Box my={4}>
                    <div style={divStyle}>
                        <DojoComponent widget={widgetValue} params={{widgetValue}} />
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
}