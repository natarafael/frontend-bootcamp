import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fishes } from "../api/api";

const CadastroPeixes = () => {
  const handleObterPeixes = async () => {
    var response = await Fishes();

    console.log(response.data);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleObterPeixes}>
        Obter peixes
      </Button>
    </div>
  );
};

export default CadastroPeixes;
