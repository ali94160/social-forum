import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from "../../../interfaces/Category";
import { StyledCategoryTitle, FlexContainer, StyledDeleteIcon, StyledWrapper } from './StyledCategoryList';
import { useCategory } from "../../../context/CategoryContext";

interface Props {
  category: Category
}

function CategoryItem({ category }: Props) {
  const { deleteCategory } = useCategory();

  const handleDelete = async () => {
    if (category.title != "General") {
      await deleteCategory(category._id);
    }
  }

  return (
    <FlexContainer>
      <StyledCategoryTitle>
        {category.title}
      </StyledCategoryTitle>

      <StyledWrapper>
        {category.title != "General" &&
        <StyledDeleteIcon onClick={handleDelete}>
          <DeleteIcon />
        </StyledDeleteIcon>}
      </StyledWrapper>

    </FlexContainer>
  )
}

export default CategoryItem;
