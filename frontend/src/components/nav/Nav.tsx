import React from "react";
import {
  Toolbar,
  Typography
} from "@mui/material";
import SideNav from "../side-nav/SideNav";
import { StyledAppBar } from "./StyledNav";

function Nav() {
  return (
    <div>
      <StyledAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Social forum
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <SideNav />
    </div>
  );
}

export default Nav;
