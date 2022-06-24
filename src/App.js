import React from "react";
import "./App.css";
import ButtonAppBar from "./compents/ButtonAppBar";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
        <ButtonAppBar></ButtonAppBar>
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </>
  );
}

export default App;
