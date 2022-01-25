import React, { useEffect } from "react";
import {
  List,
  Toolbar,
  ListItem,
  Divider,
} from "@mui/material";

import {
  StyledDrawerContainer,
  StyledDrawer,
  StyledBox,
  StyledText,
} from "./StyledCategoryDrawer";
import { useHistory } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";
import Category from "../../interfaces/Category"

interface Props {
  isOpen: boolean;
}

function CategoryDrawer({ isOpen }: Props) {
  const history = useHistory();
  const { categories, getCategories } = useCategory();

  const navigateToCategory = (name: string) => {
    history.push(`/categories/${name.toLocaleLowerCase()}`);
  };

  useEffect(() => {
    getCategories()
  },[])

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
          <List>
            {categories?.length > 0 &&
              categories.map((cat: Category) => (
              <ListItem
                button
                key={cat._id}
                onClick={() => navigateToCategory(cat.title)}
              >
                <StyledText>{cat.title}</StyledText>
              </ListItem>
            ))}
          </List>
          <Divider />
        </StyledBox>
      </StyledDrawerContainer>
    </StyledDrawer>
  );
}

export default CategoryDrawer;
