import React, { BaseSyntheticEvent, useState } from "react";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import { StyledTealButton } from "../basics/StyledTealButton";
import SelectCheckbox from "../selector-checkbox/SelectorCheckbox";
import { StyledForm } from "./StyledCreatePostForm";

// shall be removed
const categories = ["Meme", "Trollololo", "Cooking", "Economic"];

function CreatePostForm() {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <StyledForm>
      <h3>Create a post</h3>
      <BasicTextField
        value={title}
        label="Title"
        handleChange={(ev: BaseSyntheticEvent) => setTitle(ev.target.value)}
        required
      />
      <BasicTextField
        type="textarea"
        value={content}
        label="Content"
        multiline
        rows={5}
        maxRows={10}
        handleChange={(ev: BaseSyntheticEvent) => setContent(ev.target.value)}
        required
      />
      <SelectCheckbox
        label="Categories"
        options={categories}
        selected={selectedCategories}
        setSelected={setSelectedCategories}
        limitTags={3}
        isRerender={false}
      />
      <StyledTealButton>Post</StyledTealButton>
    </StyledForm>
  );
}

export default CreatePostForm;
