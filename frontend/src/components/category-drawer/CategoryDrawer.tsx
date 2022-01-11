import React from "react";
import {
  Toolbar,
  ListItem,
  Divider,
} from "@mui/material";

import {
  StyledDiv,
  StyledDrawer,
  StyledBox,
  StyledList,
  StyledText,
} from "./StyledCategoryDrawer";
import { useHistory } from "react-router-dom";

interface Props {
  isOpen: boolean;
}

function CategoryDrawer({ isOpen }: Props) {
  const history = useHistory();
  const navigateToCategory = (name: string) => {
    // temporary
    history.push(`/categories/${name}`);
  };

  return (
    <StyledDrawer
      variant="persistent"
      open={isOpen}
      sx={{
        [`& .MuiDrawer-paper`]: {
          background: "var(--dark-teal)",
          boxShadow: "10px 10px 5px var(--shadow)",
        },
      }}
    >
      <StyledDiv>
        <Toolbar />
        <StyledBox>
          <StyledList>
            {/* shall be replaced with categories */}
            {["Meme", "Trollololo", "Cooking", "Economic"].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => navigateToCategory(text)}
                >
                  <StyledText>{text}</StyledText>
                </ListItem>
              )
            )}
          </StyledList>
          <Divider />
        </StyledBox>
      </StyledDiv>
    </StyledDrawer>
  );
}

export default CategoryDrawer;
