import React from "react";
import "./App.css";
import AppBarMenu from "./compents/AppBarMenu";
import {BrowserRouter} from "react-router-dom";

import "../src/styles/custom.scss";

function App() {

  return (
    <>
        <BrowserRouter>
            <AppBarMenu></AppBarMenu>
        </BrowserRouter>
    </>
  );
}

export default App;
