
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from "../../../interfaces/Category";
import { StyledCategoryTitle, FlexContainer, StyledDeleteIcon } from './StyledCategoryList';

interface Props {
  category: Category,
}

function CategoryItem({ category }: Props) {

  const handleDelete = () => { }

  return (
    <FlexContainer>
      <StyledCategoryTitle>
        {category.title}
      </StyledCategoryTitle>

      <StyledDeleteIcon onClick={handleDelete}>
        <DeleteIcon />
      </StyledDeleteIcon>
    </FlexContainer>
  )
}

export default CategoryItem;
