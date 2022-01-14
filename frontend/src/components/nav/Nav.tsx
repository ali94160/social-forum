import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import CategoryDrawer from "../category-drawer/CategoryDrawer";
import {
  StyledAppBar,
  StyledButton,
  StyledToolBar,
  StyledTypography,
  StyledBox,
} from "./StyledNav";
import Avatar from "../avatar/Avatar";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

function Nav() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user } = useAuth();
  const { toggleAuthModal } = useModal();

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
    <StyledBox>
      <StyledAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <StyledToolBar>
          <StyledTypography variant="h6" noWrap>
            Social forum
          </StyledTypography>
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
          {!user ? (
            <StyledButton justify="end" onClick={toggleAuthModal}>
              Login
            </StyledButton>
          ) : (
            <Avatar
              justify="end"
              margin="0 1rem 0 0"
              backgroundColor="#749DAA"
            />
          )}
        </StyledToolBar>
      </StyledAppBar>
      <CategoryDrawer isOpen={isOpen} />
    </StyledBox>
  );
}

export default Nav;
