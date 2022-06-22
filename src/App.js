import React, { useState } from "react";
import "./App.css";
import CadastroPeixes from "./pages/CadastroPeixes";
import { Button } from "@mui/material";

function App() {
  const [teste, setTeste] = useState(true);

  return (
    <div>
      <h1>PIRACEMA</h1>
      {teste && <CadastroPeixes />}
    </div>
  );
}

export default App;
