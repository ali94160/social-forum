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
import { CategoryItem } from "../../interfaces/Category";

interface Props {
  isOpen: boolean;
  toggle: Function;
}

function CategoryDrawer({ isOpen, toggle }: Props) {
  const history = useHistory();
  const { categories } = useCategory();
  const navigateToCategory = (id: string) => {
    history.push(`/posts/categories/${id}`);
    toggle();
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
              (category: CategoryItem) => (
                <ListItem
                  button
                  key={category._id}
                  onClick={() => navigateToCategory(category._id)}
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
