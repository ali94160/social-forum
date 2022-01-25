import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from "../../../interfaces/Category";
import { StyledCategoryTitle, FlexContainer, StyledDeleteIcon, StyledWrapper } from './StyledCategoryList';
import { useCategory } from "../../../context/CategoryContext";
import PasswordModal from '../password-validation/PasswordModal';

interface Props {
  category: Category
}

function CategoryItem({ category }: Props) {
  const { deleteCategory } = useCategory();
  const [isDelete, setIsDelete] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(0);

  const handleDelete = async () => {
    if (category.title != "General") {
      const res = await deleteCategory({id: category._id, password});
      setStatus(res);
      if (status === 200) {
        setPassword('');
        setIsDelete(!isDelete);
      }
    }
  }

  return (
    <><FlexContainer>
      <StyledCategoryTitle>
        {category.title}
      </StyledCategoryTitle>

      <StyledWrapper>
        {category.title != "General" &&
        <StyledDeleteIcon onClick={() => setIsDelete(!isDelete)}>
          <DeleteIcon />
        </StyledDeleteIcon>}
      </StyledWrapper>
    </FlexContainer>
      {isDelete &&
        <PasswordModal
          isOpen={isDelete}
          password={password}
          setPassword={setPassword}
          status={status}
          setIsOpen={setIsDelete}
          setStatus={setStatus}
          handleConfirm={handleDelete}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        >
          <p>Do you want to delete {category.title}?</p>
        </PasswordModal>} </>
  )
}

export default CategoryItem;
