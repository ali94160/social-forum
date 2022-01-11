import React, { useState } from "react";
import { Toolbar, Typography, Box, Button } from "@mui/material";
import CategoryDrawer from "../category-drawer/CategoryDrawer";
import { StyledAppBar, StyledButton, StyledBox } from "./StyledNav";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

function Nav() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { toggleAuthModal } = useModal();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navigate = (text: string) => {
    const site: string = text == "home" ? "" : text;
    history.push(`/${site}`)
  }

  const pages = [
    { text: "home", clickEvent: navigate },
    { text: "posts", clickEvent: navigate },
    { text: "categories", clickEvent: toggleDrawer },
  ];

  return (
    <StyledBox>
      <StyledAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Social forum
          </Typography>
          <StyledBox>
            {pages.map((page) => (
              <StyledButton
                key={page.text}
                onClick={() => page.clickEvent(page.text)}
              >
                {page.text}
              </StyledButton>
            ))}
          </StyledBox>
          <StyledButton onClick={toggleAuthModal}>Login</StyledButton>
        </Toolbar>
      </StyledAppBar>
      <CategoryDrawer isOpen={isOpen} />
    </StyledBox>
  );
}

export default Nav;
