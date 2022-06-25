import {Box} from "@mui/material";
import React from "react";
import AntennaTable from "../../compents/AntennaTable";

const Antennas = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap">
      <Box width="100%" textAlign="center">
          <Box width="90%" p={4}>
              <AntennaTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Antennas;
