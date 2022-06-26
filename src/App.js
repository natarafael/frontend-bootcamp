import React from "react";
import "./App.css";
import AppBarMenu from "./compents/AppBarMenu";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../src/styles/custom.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppBarMenu></AppBarMenu>
        <ToastContainer draggable={false} transition={Zoom} />
      </BrowserRouter>
    </>
  );
}

export default App;
