import {Box, Typography} from "@mui/material";
import React from "react";
import PassTable from "../../compents/PassTable";

const Passes = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap" alignContent="center" textAlign="center">
      <Box width="100%">
        <Typography variant="h3" sx={{color:"#ffff"}} p={2}>Registro de Passagem dos Peixes</Typography>
          <Box width="90%" marginLeft="5%">
              <PassTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Passes;
