import React from "react";
import {
  Typography,
  Drawer
} from "@material-ui/core";


function VerticalBar() {
  return (
        <Drawer anchor="left" variant="pernament" color="#195FA5" >
              <Typography variant="h6">
                Teams
              </Typography>
        </Drawer>
  );
}
export default VerticalBar;