import { useState, BaseSyntheticEvent } from "react";
import { Category } from "../../../interfaces/Category";
import Card from '@mui/material/Card';
import CategoryItem from './CategoryItem';
import { useCategory } from "../../../context/CategoryContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { StyledAddWrapper, StyledHeader, StyledInputWrapper } from './StyledCategoryList';
import BasicTextField from "../../basics/basic-text-field/BasicTextField";
import { StyledTealButton } from "../../basics/StyledTealButton";


function CategoriesList() {
  const [display, setDisplay] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('')
  const [icon, setIcon] = useState<string>('')
  const { categories, addCategory } = useCategory();

  const addNewCategory = async (e: any) => {
    e.preventDefault();
    
    const newCategory = {
      title,
      icon
    }
    await addCategory(newCategory);
    setTitle('');
    setIcon('');
  }

  return (
    <>
      <Card>
        <StyledAddWrapper>
          <AddCircleIcon onClick={() => setDisplay(!display)}/>
          <StyledHeader >
            Add new category
          </StyledHeader>
        </StyledAddWrapper>

      {display &&
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
            required
            />
            
          <StyledTealButton type="submit" variant="contained" onClick={(e) => addNewCategory(e)}>
            Add
          </StyledTealButton>
        </StyledInputWrapper>}

        {categories.map((category: Category) =>
          <CategoryItem key={category._id} category={category} />
        )}
      </Card>
     </> 
  )
}

export default CategoriesList;
