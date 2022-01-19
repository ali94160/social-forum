import { StyledTitleGrid } from './StyledPost';
import Grid from '@mui/material/Grid';
import { PostItem } from '../../interfaces/Post';
import BasicSelect from "../basics/basic-select/BasicSelect";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import { BaseSyntheticEvent } from 'react';

interface Props {
  post: PostItem | null;
  edit: boolean;
  setTitle: Function;
  setContent: Function;
  setSelectedCategory: Function;
  categories: string[];
  selectedCategory: string;
}

function EditForm({ post,
  edit,
  setTitle,
  setContent,
  setSelectedCategory,
  categories,
  selectedCategory }: Props) {
  return (
    <><StyledTitleGrid item xs>
        {!edit ? post?.title :
          <BasicTextField
            label="Title"
            fullWidth={true}
            defaultValue={post?.title}
            inputProps={{
              maxLength: 40,
            }}
            handleChange={(e: BaseSyntheticEvent) => setTitle(e.target.value)}
            required
          />}
        </StyledTitleGrid>
        <Grid item xs>
          {!edit ? post?.content :
            <BasicTextField
              label="Content"
              multiline
              fullWidth={true}
              defaultValue={post?.content}
              rows={8}
              inputProps={{maxLength: 1000}}
              handleChange={(e: BaseSyntheticEvent) => setContent(e.target.value)}
              required
            />}
          </Grid>
          {edit &&
            <Grid item xs>
              <BasicSelect
                label="Category"
                value={selectedCategory}
                options={categories}
                handleChange={(value: string) => setSelectedCategory(value)}
              />
          </Grid>}
        </>
  )
}

export default EditForm

