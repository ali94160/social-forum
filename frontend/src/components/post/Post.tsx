import {
  StyledPost,
  StyledGrid,
  StyledLeftGrid,
  StyledBottomGrid,
  StyledAvatarGrid,
} from './StyledPost';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { PostItem } from '../../interfaces/Post';
import { StyledAvatar } from '../post-card/StyledPostCard';
import { formatModStr } from './HandleModerators';
import CheckIcon from '@mui/icons-material/Check';
import { usePost } from '../../context/PostContext';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../../interfaces/User';
import EditForm from './EditForm';

interface Props {
  post: PostItem | null;
  me: User;
}
// shall be removed
const categories = ["Meme", "Trollololo", "Cooking", "Economic"];

function Post({post, me}: Props) {
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
  const [isPostOwner, setIsPostOwner] = useState(false);

  useEffect(() => {
    handleIsPostOwner();
  }, [me])
  
  useEffect(() => {
    handleModeratorStr()
  }, [post?.moderatorsIds]);

  const handleIsPostOwner = () => {
    if (me && me._id === post?.ownerId?._id) {
      setIsPostOwner(true);
    } else {
      setIsPostOwner(false);
    }
  }

  const handleModeratorStr = () => {
    const str = formatModStr(post);
    setModerators(str);
  };

  const handleEdit = async () => {
    setEdit(!edit);
    if (edit) {
      const status = await updatePost({
        _id: post?._id,
        title: title? title : post?.title,
        content: content? content : post?.content,
        categoryId: null // ändra när category är på plats
      });
      setStatus(status);
    }
    if (status === 200) {
      setEdit(!edit); 
    }
  }

  return (
    <StyledPost>
      <StyledGrid container spacing={2}>
        <Grid
          item
          xs={2}
          container
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <StyledAvatarGrid item xs>
            <StyledAvatar style={{ margin: "0 auto", marginBottom: "10px" }}>
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
          <EditForm
            post={post}
            edit={edit}
            setTitle={setTitle}
            setContent={setContent}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </Grid>

        <StyledLeftGrid item xs={2}>
          {isPostOwner ? (!edit ?
            <EditIcon onClick={handleEdit} />
            : <><CheckIcon onClick={handleEdit} sx={{marginBottom: '15px'}} /><br/>
              <CloseIcon onClick={() => setEdit(!edit)} /></>) : ''}
        </StyledLeftGrid>

        <StyledBottomGrid item xs={12} container direction="row" spacing={2}>
          <Grid item xs={8}>
            Post moderators: {moderators}
          </Grid>
          <StyledLeftGrid item xs={4}>
            {date} {hours}:{minutes}
          </StyledLeftGrid>
        </StyledBottomGrid>

      </StyledGrid> 
    </StyledPost>
  );
}

export default Post;
