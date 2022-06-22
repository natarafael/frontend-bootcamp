import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetAllFishes } from "../api/api";
import FishCard from "../compents/FishCard";

const CadastroPeixes = () => {
  const [fishes, setFishes] = useState();
  const [show, setShow] = useState(false);

  const handleGetAllFishes = async () => {
    var response = await GetAllFishes();
    setFishes(response.data);
    setShow(true);
    console.log(fishes);
  };

  useEffect(() => {
    const fetchFishes = async () => {
      var response = await GetAllFishes();
      setFishes(response.data);
    };
    fetchFishes();
  }, []);

  console.log(fishes);

  return (
    <div>
      <h4>{fishes[1].pittag}</h4>
    </div>
  );
};

export default CadastroPeixes;
