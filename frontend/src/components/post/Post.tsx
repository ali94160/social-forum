import { StyledPost, StyledGrid, StyledLeftGrid, StyledBottomGrid, StyledAvatarGrid, StyledTitleGrid } from './StyledPost';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { User } from '../../interfaces/User';
import { PostItem } from '../../interfaces/Post';
import { StyledAvatar } from '../post-card/StyledPostCard';

interface Props {
  id: any;
  post: PostItem | undefined;
}


// behåller id ifall man vill använda vid redigering av post??

function Post({ id, post }: Props) {
  const date = post?.createdDate?.substr(0, 10);
  const time = post && new Date(post.createdDate);
  const [moderators, setModerators] = useState('');
  
  useEffect(() => {
    handleModerators()
  }, [post?.moderatorsIds])

  const handleModerators = () => {
    let str = '';
    if (!post?.moderatorsIds?.length) {
      str += 'none';
    } else {
      post?.moderatorsIds?.map((m: User, i: number) => {
        if (i === 0) {
          str += m.username;
          return;
        }
        if (post?.moderatorsIds.length > 1 && i === post?.moderatorsIds.length - 1) {
          str += ' and ';
          str += m.username;
        } else if(post?.moderatorsIds.length > 2) {
          str += ', ';
          str += m.username;
        }
      });
    }
    setModerators(str);
  }

  const handleEdit = () => {
    console.log('i want to edit ', post?._id)
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
            {post?.title}
          </StyledTitleGrid>
          <Grid item xs>
            {post?.content}
          </Grid>
        </Grid>
        <StyledLeftGrid item xs={2}>
          <EditIcon onClick={handleEdit} />
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
