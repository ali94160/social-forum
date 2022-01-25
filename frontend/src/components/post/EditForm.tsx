import { StyledTitleGrid } from './StyledPost';
import Grid from '@mui/material/Grid';
import { PostItem } from '../../interfaces/Post';
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import { BaseSyntheticEvent } from 'react';
import CategorySelect from '../category-select/CategorySelect';
import { useCategory } from '../../context/CategoryContext';

interface Props {
  post: PostItem | null;
  edit: boolean;
  setTitle: Function;
  setContent: Function;
  setCategoryId: Function;
  categoryId: string;
}

function EditForm({
  post,
  edit,
  setTitle,
  setContent,
  setCategoryId,
  categoryId,
}: Props) {
  
  const { categories } = useCategory()
  
  return (
    <>
      <StyledTitleGrid item xs>
        {!edit ? (
          post?.title
        ) : (
          <BasicTextField
            label="Title"
            fullWidth={true}
            defaultValue={post?.title}
            inputProps={{
              maxLength: 40,
            }}
            handleChange={(e: BaseSyntheticEvent) => setTitle(e.target.value)}
            required
          />
        )}
      </StyledTitleGrid>
      <Grid item xs>
        {!edit ? (
          post?.content
        ) : (
          <BasicTextField
            label="Content"
            multiline
            fullWidth={true}
            defaultValue={post?.content}
            rows={8}
            inputProps={{ maxLength: 1000 }}
            handleChange={(e: BaseSyntheticEvent) => setContent(e.target.value)}
            required
          />
        )}
      </Grid>
      {edit && (
        <Grid item xs>
          <CategorySelect
            label="Category"
            value={categoryId}
            options={categories}
            handleChange={(value: string) => setCategoryId(value)}
          />
        </Grid>
      )}
    </>
  );
}

export default EditForm

