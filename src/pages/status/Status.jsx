import {Box, Typography} from "@mui/material";
import React from "react";
import StatusTable from "../../compents/StatusTable";

const Status = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap" alignContent="center" textAlign="center">
      <Box width="100%">
        <Typography variant="h3" sx={{color:"#ffff"}} p={2}>Registro de Status das Antenas</Typography>
          <Box width="90%" marginLeft="5%">
              <StatusTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Status;
