import React from 'react'
import {
  Toolbar,
  Drawer,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import { StyledBox, StyledList } from "./StyledSideNav";

const drawerWidth = "20%";


function SideNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .MuiDrawer-paper`]: {
          background: "var(--dark-teal)",
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <StyledBox>
        <StyledList sx={{ color: "white" }}>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </StyledList>
        <Divider />
      </StyledBox>
    </Drawer>
  );
}

export default SideNav
