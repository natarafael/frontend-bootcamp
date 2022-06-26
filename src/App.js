import React from "react";
import "./App.css";
import AppBarMenu from "./compents/AppBarMenu";
import {BrowserRouter} from "react-router-dom";

import "../src/styles/custom.scss";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
        <BrowserRouter>
            <AppBarMenu></AppBarMenu>
            <ToastContainer draggable={false} />
        </BrowserRouter>
    </>
  );
}

export default App;
