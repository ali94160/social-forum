import React from "react";
import {
  Toolbar,
  ListItem,
  Divider,
} from "@mui/material";

import {
  StyledDrawerContainer,
  StyledDrawer,
  StyledBox,
  StyledList,
  StyledText,
} from "./StyledCategoryDrawer";
import { useHistory } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";
import { Category } from "../../interfaces/Category";

interface Props {
  isOpen: boolean;
}

function CategoryDrawer({ isOpen }: Props) {
  const history = useHistory();
  const {categories} = useCategory();
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
      <StyledDrawerContainer>
        <Toolbar />
        <StyledBox>
          <StyledList>
            {categories.map(
              (category: Category) => (
                <ListItem
                  button
                  key={category._id}
                  onClick={() => navigateToCategory(category.title.toLowerCase())}
                >
                  <span className="material-icons">{category.icon}</span>
                  <StyledText>{category.title}</StyledText>
                </ListItem>
              )
            )}
          </StyledList>
          <Divider />
        </StyledBox>
      </StyledDrawerContainer>
    </StyledDrawer>
  );
}

export default CategoryDrawer;
