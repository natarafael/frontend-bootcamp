import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetAllFishes } from "../api/api";
import FishCard from "../compents/FishCard";

const CadastroPeixes = () => {
  const [fishes, setFishes] = useState();
  const handleGetAllFishes = async () => {
    var response = await GetAllFishes();
    setFishes(response.data);
    console.log(response.data);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleGetAllFishes}>
        Obter peixes
      </Button>
      {/* {show && <FishCard fishes={fishes} />} */}
    </div>
  );
};

export default CadastroPeixes;
