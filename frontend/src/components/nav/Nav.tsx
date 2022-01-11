import React, { useState } from "react";
import { Toolbar, Typography, Box, Button } from "@mui/material";
import CategoryDrawer from "../category-drawer/CategoryDrawer";
import { StyledAppBar, StyledButton } from "./StyledNav";

function Nav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  };

  const pages = [
    { text: "Home", clickEvent: toggleDrawer },
    { text: "Posts", clickEvent: toggleDrawer },
    { text: "Categories", clickEvent: toggleDrawer },
  ];

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
          <Box>
            {pages.map((page) => (
              <StyledButton key={page.text} onClick={page.clickEvent}>
                {page.text}
              </StyledButton>
            ))}
          </Box>
        </Toolbar>
      </StyledAppBar>
      <CategoryDrawer isOpen={isOpen} />
    </div>
  );
}

export default Nav;
