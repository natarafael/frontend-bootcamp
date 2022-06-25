import {Box} from "@mui/material";
import React from "react";
import FishTable from "../../compents/FishTable";

const Fishes = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap">
      <Box width="100%" textAlign="center">
          <Box p={4} width="90%" >
              <FishTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Fishes;
