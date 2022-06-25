import {Box} from "@mui/material";
import React from "react";
import StatusTable from "../../compents/StatusTable";

const Status = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap">
      <Box width="100%" textAlign="center">
          <Box width="90%" p={4}>
              <StatusTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Status;
