import { StyledPost, StyledGrid, StyledLeftGrid, StyledBottomGrid } from './StyledPost';
import Avatar from '../avatar/Avatar';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { User} from '../../interfaces/User';
import { StyledAvatar } from '../postCard/StyledPostCard'

interface Props {
  id: any;
  post: any;
}

function Post({ id, post }: Props) {
  const date = post.createdDate?.substr(0, 10);
  const time = new Date(post.createdDate);
  const [moderators, setModerators] = useState('');

  useEffect(() => {
    handleModerators()
  }, [post.moderatorsIds])

  const handleModerators = () => {
    let str = '';
    if (!post.moderatorsIds?.length) {
      str += 'none';
    } else {
      post.moderatorsIds?.map((m: User, i: number) => {
        if (i === 0) {
          str += m.username;
          return;
        }
        if (post.moderatorsIds.length > 1 && i === post.moderatorsIds.length - 1) {
          str += ' and ';
          str += m.username;
        } else if(post.moderatorsIds.length > 2) {
          str += ', ';
          str += m.username;
        }
      });
    }
    setModerators(str);
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
            <Grid item xs>
              <StyledAvatar>
                {post?.ownerId?.username.charAt(0).toUpperCase()}
              </StyledAvatar>
            </Grid>
            <Grid item xs>
              {post.ownerId?.username}
            </Grid>
        </Grid>
        
        <Grid
          item xs={8}
          container
          direction="column"
          spacing={2}
          >    
          <Grid item xs>
            {post.title}
          </Grid>
          <Grid item xs>
            {post.content}
          </Grid>
        </Grid>
        <StyledLeftGrid item xs={2}>
          <EditIcon />
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
            {date} {time.getHours()}:{time.getMinutes()}
          </StyledLeftGrid>
        </StyledBottomGrid>
        
      </StyledGrid> 
    </StyledPost>
  )
}

export default Post;
