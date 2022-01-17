import { StyledPost, StyledGrid } from './StyledPost';
import Avatar from '../avatar/Avatar';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';

import { usePost } from '../../context/PostContext';

interface Props {
  id: any;
  post: Post;
}

interface Post {


}

function Post({ id, post }: Props) {
    
  

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
              <Avatar />
            </Grid>
            <Grid item xs>
              #username
            </Grid>
        </Grid>
        
        <Grid
          item xs={8}
          container
          direction="column"
          spacing={2}
          >    
          <Grid item xs>
            #title
          </Grid>
          <Grid item xs>
            #content
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <EditIcon />
        </Grid>
        <Grid item xs={8}>
          Post moderators: 
        </Grid>
        <Grid item xs={4}>
          #posted_at
        </Grid>
        
      </StyledGrid> 
    </StyledPost>
  )
}

export default Post;
