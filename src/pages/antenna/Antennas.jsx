import {Box, Typography} from "@mui/material";
import React from "react";
import AntennaTable from "../../compents/AntennaTable";

const Antennas = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap" alignContent="center" textAlign="center">
      <Box width="100%">
        <Typography variant="h3" sx={{color:"#ffff"}} p={2}>Antenas Cadastradas</Typography>
          <Box width="90%" marginLeft="5%">
              <AntennaTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Antennas;
