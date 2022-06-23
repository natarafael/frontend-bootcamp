import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {GetAllFishes} from "../api/api";
import FishTable from "../compents/FishTable";

const Fishes = () => {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(false);

  const FetchFishes = async () => {
    setLoading(true);
    try {
      var responseFishes = await GetAllFishes();
      setFishes(responseFishes.data);
      setLoading(false)
    } catch {
      console.log("erro ao buscar dados")
    }
  };

  console.log(fishes)

  useEffect(() => {
    FetchFishes();
  }, []);

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap" alignContent="center" textAlign="center">
      <Box width="100%">
        <Typography variant="h3" sx={{color:"#ffff"}} p={2}>Peixes Cadastrados</Typography>
          <Box width="90%" marginLeft="5%">
              <FishTable fishes={fishes}/>
          </Box>
      </Box>
    </Box>
  );
};

export default Fishes;
