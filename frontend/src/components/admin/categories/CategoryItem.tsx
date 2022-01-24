import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from "../../../interfaces/Category";
import { StyledCategoryTitle, FlexContainer, StyledDeleteIcon, StyledWrapper } from './StyledCategoryList';
import { useAuth } from "../../../context/AuthContext";

interface Props {
  category: Category
}

function CategoryItem({ category }: Props) {
  const [isAdmin, setIsAdmin] = useState(false)
  const { user } = useAuth();

  useEffect(() => {
    if (user.roles.includes('ADMIN')) {
      setIsAdmin(true)
    }
  },[])

  const handleDelete = () => {
  }

  return (
    <FlexContainer>
      <StyledCategoryTitle>
        {category.title}
      </StyledCategoryTitle>

      <StyledWrapper>
        <StyledDeleteIcon onClick={handleDelete}>
          <DeleteIcon />
        </StyledDeleteIcon>

      </StyledWrapper>

    </FlexContainer>
  )
}

export default CategoryItem;
