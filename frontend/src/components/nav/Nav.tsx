import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import CategoryDrawer from "../category-drawer/CategoryDrawer";
import {
  StyledAppBar,
  StyledButton,
  StyledToolBar,
  StyledTypography,
} from "./StyledNav";
import { useHistory } from "react-router-dom";
import Avatar from "../avatar/Avatar";

function Nav() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navigate = (text: string) => {
    const site: string = text == "home" ? "" : text;
    history.push(`/${site}`);
  };

  const pages = [
    { text: "home", clickEvent: navigate },
    { text: "posts", clickEvent: navigate },
    { text: "categories", clickEvent: toggleDrawer },
  ];

  return (
    <div>
      <StyledAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <StyledToolBar>
          <StyledTypography variant="h6" noWrap>
            Social forum
          </StyledTypography>
          <Box>
            {pages.map((page) => (
              <StyledButton
                key={page.text}
                onClick={() => page.clickEvent(page.text)}
              >
                {page.text}
              </StyledButton>
            ))}
          </Box>
          <Avatar justify="end" margin="0 1rem 0 0" backgroundColor="#749DAA" />
        </StyledToolBar>
      </StyledAppBar>
      <CategoryDrawer isOpen={isOpen} />
    </div>
  );
}

export default Nav;
