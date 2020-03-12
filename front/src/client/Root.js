import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import  GlobalThemeProvider  from "../../src/styles/GlobalThemeProvider";

import configure from "store/configure";
import App from "components/App";

const store = configure();

const Root = () => (
  <Provider store={store}>
    <GlobalThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalThemeProvider>
  </Provider>
);

export default Root;
