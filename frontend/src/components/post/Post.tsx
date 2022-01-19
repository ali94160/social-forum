import {
  StyledPost,
  StyledGrid,
  StyledLeftGrid,
  StyledBottomGrid,
  StyledAvatarGrid,
  StyledTitleGrid
} from './StyledPost';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState, BaseSyntheticEvent } from 'react';
import { PostItem } from '../../interfaces/Post';
import { StyledAvatar } from '../post-card/StyledPostCard';
import { formatModStr } from './HandleModerators';
import CheckIcon from '@mui/icons-material/Check';
import BasicSelect from "../basics/basic-select/BasicSelect";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import { usePost } from '../../context/PostContext';
import { PortraitTwoTone } from '@mui/icons-material';

interface Props {
  post: PostItem | null;
}
// shall be removed
const categories = ["Meme", "Trollololo", "Cooking", "Economic"];

function Post({post}: Props) {
  const date = post?.createdDate?.substr(0, 10);
  const time = post && new Date(post.createdDate);
  const [moderators, setModerators] = useState('');
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const hours = time?.getHours();
  const minutes = (time && time?.getMinutes() < 10 ? '0' : '') + time?.getMinutes();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { updatePost } = usePost();
  const [status, setStatus] = useState(0);
  
  
  useEffect(() => {
    handleModeratorStr()
  }, [post?.moderatorsIds])

  const handleModeratorStr = () => {
    const str = formatModStr(post);
    setModerators(str);
  }

  const handleEdit = async () => {
    console.log('i want to edit ', post?._id)
    if (edit) {
      const status = await updatePost({
        _id: post?._id,
        title: title? title : post?.title,
        content: content? content : post?.content,
        categoryId: null // ändra när category är på plats
      });
      setStatus(status);
    }
    setEdit(!edit);
  }

  return (
    <StyledPost>
      <StyledGrid container spacing={2}>

        <Grid
          item xs={2}
          container
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center">
            <StyledAvatarGrid item xs>
              <StyledAvatar style={{margin: '0 auto', marginBottom: '10px'}}>
                {post?.ownerId?.username.charAt(0).toUpperCase()}
            </StyledAvatar>
            {post?.ownerId?.username}
            </StyledAvatarGrid>
        </Grid>
        
        <Grid
          item xs={8}
          container
          direction="column"
          spacing={2}
          >    
          <StyledTitleGrid item xs>
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
          </Grid>
          }
        </Grid>

        <StyledLeftGrid item xs={2}>
          {!edit ?
            <EditIcon onClick={handleEdit} />
            : <CheckIcon onClick={handleEdit} />}
        </StyledLeftGrid>

        <StyledBottomGrid
          item xs={12}
          container
          direction="row"
          spacing={2}
          >   
          <Grid item xs={8}>
            Post moderators: {moderators}
          </Grid>
          <StyledLeftGrid item xs={4}>
            {date} {hours}:{minutes}
          </StyledLeftGrid>
        </StyledBottomGrid>

        
        
      </StyledGrid> 
    </StyledPost>
  )
}

export default Post;
