import {
  StyledPost,
  StyledGrid,
  StyledLeftGrid,
  StyledBottomGrid,
  StyledAvatarGrid,
  StyledTitleGrid,
  StyledOutlinedInput
} from './StyledPost';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { PostItem } from '../../interfaces/Post';
import { StyledAvatar } from '../post-card/StyledPostCard';
import { formatModStr } from './HandleModerators';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  id: any;
  post: PostItem | undefined;
}


// behåller id ifall man vill använda vid redigering av post??

function Post({ id, post }: Props) {
  const date = post?.createdDate?.substr(0, 10);
  const time = post && new Date(post.createdDate);
  const [moderators, setModerators] = useState('');
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  
  
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
      console.log('new title', newTitle);
      console.log('new content', newContent);
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
              <StyledOutlinedInput
                placeholder={post?.title}
                inputProps={{
                  maxLength: 40,
                }}
                onChange={(e) => setNewTitle(e.target.value)}
              />}
          </StyledTitleGrid>
          <Grid item xs>
            {!edit ? post?.content :
              <StyledOutlinedInput
                placeholder={post?.content}
                multiline
                rows={8}
                inputProps={{
                  maxLength: 1000,
                }}
                onChange={(e) => setNewContent(e.target.value)}
              />}
          </Grid>
        </Grid>

        <StyledLeftGrid item xs={2}>
          {!edit ? <EditIcon onClick={handleEdit} /> : <CheckIcon onClick={handleEdit} />}
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
            {date} {time?.getHours()}:{time?.getMinutes()}
          </StyledLeftGrid>
        </StyledBottomGrid>
        
      </StyledGrid> 
    </StyledPost>
  )
}

export default Post;
