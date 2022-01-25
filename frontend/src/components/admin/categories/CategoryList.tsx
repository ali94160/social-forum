import { useState, BaseSyntheticEvent } from "react";
import { Category } from "../../../interfaces/Category";
import Card from '@mui/material/Card';
import CategoryItem from './CategoryItem';
import { useCategory } from "../../../context/CategoryContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { StyledAddWrapper, StyledHeader, StyledInputWrapper } from './StyledCategoryList';
import BasicTextField from "../../basics/basic-text-field/BasicTextField";
import { StyledTealButton } from "../../basics/StyledTealButton";


function CategoriesList() {
  const [display, setDisplay] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('')
  const [icon, setIcon] = useState<string>('')
  const { categories, addCategory } = useCategory();

  const addNewCategory = async (e: any) => {
    e.preventDefault();
    const newCategory = {
      title,
      icon: icon !== '' ? icon : "tag"
    }
    await addCategory(newCategory);
    setTitle('');
    setIcon('');
  }

  const renderAddCategory = () => (
    <StyledInputWrapper>
      <BasicTextField
        type="text"
        value={title}
        label="Title"
        placeholder="Title"
        handleChange={(ev: any) => setTitle(ev.target.value)}
        required
      />

      <BasicTextField
        type="text"
        value={icon}
        label="Icon"
        placeholder="Icon"
        handleChange={(ev: any) => setIcon(ev.target.value)}
      />

      <StyledTealButton type="submit" variant="contained" onClick={(e) => addNewCategory(e)}>
        Add
      </StyledTealButton>
    </StyledInputWrapper>
  );

  return (
    <Card>
      <StyledAddWrapper>
        {!display ?
          (<AddCircleIcon onClick={() => setDisplay(!display)} />) :
          (<CloseIcon onClick={() => setDisplay(!display)} />)
        }
        <StyledHeader >
          Add new category
        </StyledHeader>
      </StyledAddWrapper>

    {display && renderAddCategory()}

      {categories.map((category: Category, index: number) =>
        <CategoryItem key={category._id} category={category} />
      )}
    </Card>
  )
}

export default CategoriesList;
