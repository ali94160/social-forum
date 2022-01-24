import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import BasicSelect from "../basics/basic-select/BasicSelect";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import { usePost } from "../../context/PostContext";
import { StyledTealButton } from "../basics/StyledTealButton";
import {
  StyledForm,
  StyledTermsWrapper,
  StyledReadMore,
} from "./StyledCreatePostForm";
import { useHistory } from "react-router-dom";
import { Checkbox } from "@mui/material";
import Terms from "../terms-and-conditions/Terms";

// shall be removed
const categories = ["Meme", "Trollololo", "Cooking", "Economic"];
const minRow = 5;
const maxRow = 10;

function CreatePostForm() {
  const history = useHistory();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const { createPost } = usePost();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      categoryId: "61dc3a622f8ecad1bc1367b2",
    };
    await createPost(newPost);
    history.push("/");
  };

  return (
    <StyledForm onSubmit={(e) => handleAddPost(e)}>
      {!readMore ? (
        <>
          <h3>Create a post</h3>
          <div>
            <BasicTextField
              value={title}
              label="Title"
              handleChange={(ev: BaseSyntheticEvent) =>
                setTitle(ev.target.value)
              }
              required
            />
          </div>
          <div>
            <BasicTextField
              type="textarea"
              value={content}
              label="Content"
              multiline
              minRows={minRow}
              maxRows={maxRow}
              handleChange={(ev: BaseSyntheticEvent) =>
                setContent(ev.target.value)
              }
              required
            />
          </div>
          <BasicSelect
            value={selectedCategory}
            label="Category"
            options={categories}
            handleChange={(value: string) => setSelectedCategory(value)}
          />
          <StyledTermsWrapper>
            <Checkbox
              checked={check}
              onChange={() => setCheck(!check)}
              inputProps={{ "aria-label": "controlled" }}
              required
              sx={{
                color: "var(--dark-teal)",
                "&.Mui-checked": {
                  color: "var(--dark-teal)",
                },
              }}
            />
            Accept conditions{" "}
            <StyledReadMore onClick={() => setReadMore(true)}>
              (read more)
            </StyledReadMore>
          </StyledTermsWrapper>
          <StyledTealButton type="submit">Post</StyledTealButton>
        </>
      ) : (
        <Terms setReadMore={setReadMore} />
      )}
    </StyledForm>
  );
}

export default CreatePostForm;
