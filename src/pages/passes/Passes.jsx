import {Box} from "@mui/material";
import React from "react";
import PassTable from "../../compents/PassTable";

const Passes = () => {

  return (
    <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap">
      <Box width="100%" textAlign="center">
          <Box width="90%" p={4}>
              <PassTable/>
          </Box>
      </Box>
    </Box>
  );
};

export default Passes;
