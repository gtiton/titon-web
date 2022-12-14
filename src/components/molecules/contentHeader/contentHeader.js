import React from "react";
import { Grid } from "@mui/material";


const ContentHeader = ({ children, mt }) => {
  return (
    <>
      <Grid
        container
        paddingLeft={3}
        mt={mt}
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {children}
      </Grid>
    </>
  );
};

export default ContentHeader;
