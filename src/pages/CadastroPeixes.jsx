import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetAllFishes } from "../api/api";

const CadastroPeixes = () => {
  const [fishes, setFishes] = useState([]);

  const FetchFishes = async () => {
    var responseFishes = await GetAllFishes();
    setFishes(responseFishes.data);
  };

  useEffect(() => {
    FetchFishes();
  }, []);

  return (
    <div>
      {fishes.map((fish) => (
        <Typography key={fish.id}>{fish.commonName}</Typography>
      ))}
    </div>
  );
};

export default CadastroPeixes;
