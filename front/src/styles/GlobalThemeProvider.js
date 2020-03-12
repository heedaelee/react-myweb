import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import purple from '@material-ui/core/colors/purple';

const GlobalTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#111",
      main: '#99CCFF',
      darkBlue: "#083D77",
      text: "#111",
      latte: "#FFF8E8",
      pinkRaspberry:"#89043D",
      lightYellow: "#fdcb6e"
    },
  }
});

const GlobalThemeProvider = ({ children }) => (
  <ThemeProvider theme={GlobalTheme}>{children}</ThemeProvider>
)

export default GlobalThemeProvider;