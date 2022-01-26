import { useState, BaseSyntheticEvent } from "react";
import { Category } from "../../../interfaces/Category";
import Card from "@mui/material/Card";
import CategoryItem from "./CategoryItem";
import { useCategory } from "../../../context/CategoryContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledAddWrapper,
  StyledHeader,
  StyledInputWrapper,
} from "./StyledCategoryList";
import BasicTextField from "../../basics/basic-text-field/BasicTextField";
import { StyledTealButton } from "../../basics/StyledTealButton";
import PasswordModal from "../password-validation/PasswordModal";

function CategoriesList() {
  const [display, setDisplay] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const { categories, addCategory } = useCategory();
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(0);

  const addNewCategory = async () => {
    const newCategory = {
      title,
      icon: icon !== "" ? icon : "tag",
    };
    const res = await addCategory({ category: newCategory, password });
    setStatus(res);
    if (res === 200) {
      setTitle("");
      setIcon("");
      setIsAdd(!isAdd);
      setPassword("");
      setDisplay(!display);
    }
  };

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

      <StyledTealButton
        type="submit"
        variant="contained"
        onClick={() => setIsAdd(!isAdd)}
      >
        Add
      </StyledTealButton>
    </StyledInputWrapper>
  );

  return (
    <>
      <Card>
        <StyledAddWrapper>
          {!display ? (
            <AddCircleIcon onClick={() => setDisplay(!display)} />
          ) : (
            <CloseIcon onClick={() => setDisplay(!display)} />
          )}
          <StyledHeader>Add new category</StyledHeader>
        </StyledAddWrapper>

        {display && renderAddCategory()}

        {categories.map((category: Category, index: number) => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </Card>
      {isAdd && (
        <PasswordModal
          isOpen={isAdd}
          password={password}
          setPassword={setPassword}
          status={status}
          setIsOpen={setIsAdd}
          setStatus={setStatus}
          handleConfirm={addNewCategory}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        >
          <p>Do you want to add {title} as a category?</p>
        </PasswordModal>
      )}
    </>
  );
}

export default CategoriesList;
