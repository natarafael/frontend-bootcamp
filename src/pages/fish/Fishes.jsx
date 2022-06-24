import {Box, Typography} from "@mui/material";
import React from "react";
import FishTable from "../../compents/FishTable";

const Fishes = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap" alignContent="center" textAlign="center">
      <Box width="100%">
        <Typography variant="h3" sx={{color:"#ffff"}} p={2}>Peixes Cadastrados</Typography>
          <Box width="90%" marginLeft="5%">
              <FishTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Fishes;
