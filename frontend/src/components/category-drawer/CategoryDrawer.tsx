import React from 'react'
import {
  Toolbar,
  Drawer,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import { StyledBox, StyledList, StyledText } from "./StyledCategoryDrawer";

const drawerWidth = "20%";

interface Props {
  isOpen: boolean
}

function CategoryDrawer({isOpen} : Props) {
  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      sx={{
        [`& .MuiDrawer-paper`]: {
          background: "var(--dark-teal)",
          opacity: 0.95,
          width: drawerWidth,
          minWidth: 200,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <StyledBox>
        <StyledList>
          {/* shall be replaced with categories */}
          {["Meme", "Trollololo", "Cooking", "Economic"].map((text, index) => (
            <ListItem button key={text}>
              <StyledText>{text}</StyledText>
            </ListItem>
          ))}
        </StyledList>
        <Divider />
      </StyledBox>
    </Drawer>
  );
}

export default CategoryDrawer;
