import {
  StyledPost,
  StyledGrid,
  StyledLeftGrid,
  StyledBottomGrid,
  StyledAvatarGrid,
} from "./StyledPost";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { PostItem } from "../../interfaces/Post";
import { StyledAvatar } from "../post-card/StyledPostCard";
import { formatModStr } from "./HandleModerators";
import CheckIcon from "@mui/icons-material/Check";
import { usePost } from "../../context/PostContext";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../../interfaces/User";
import EditForm from "./EditForm";
import { useLocation } from "react-router-dom";

interface Props {
  post: PostItem;
  me: User;
}

interface Location {
  location: undefined | true;
  editMode?: boolean;
}

function Post({ post, me }: Props) {
  const date = post?.createdDate?.substr(0, 10);
  const time = post && new Date(post.createdDate);
  const [moderators, setModerators] = useState("");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<any>(
    typeof post?.categoryId == "object" ? post.categoryId._id : ""
  );
  const hours = time?.getHours();
  const minutes =
    (time && time?.getMinutes() < 10 ? "0" : "") + time?.getMinutes();
  const { updatePost } = usePost();
  const [status, setStatus] = useState(0);
  const [isPostOwner, setIsPostOwner] = useState(false);
  const location = useLocation<Location>();
  
  useEffect(() => {
    handleIsPostOwner();
  }, [me]);

  useEffect(() => {
    handleModeratorStr();
  }, [post?.moderatorsIds]);

  const handleIsPostOwner = () => {
    if (me && me._id === post?.ownerId?._id) {
      setIsPostOwner(true);
    } else {
      setIsPostOwner(false);
    }
  };

  const handleModeratorStr = () => {
    const str = formatModStr(post);
    setModerators(str);
  };

  useEffect(() => {
    if (location?.state?.editMode === true) {
      setEdit(true);
    }
  }, []);

  const handleEdit = async () => {
    setEdit(!edit);
    if (edit) {
      const status = await updatePost({
        _id: post?._id,
        title: title ? title : post?.title,
        content: content ? content : post?.content,
        categoryId: categoryId ?? post?.categoryId,
      });
      setStatus(status);
    }
    if (status === 200) {
      setEdit(!edit);
    }
  };

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

        <Grid item xs={8} container direction="column" spacing={2}>
          <EditForm
            post={post}
            edit={edit}
            setTitle={setTitle}
            setContent={setContent}
            setCategoryId={setCategoryId}
            categoryId={categoryId}
          />
        </Grid>

        <StyledLeftGrid item xs={2}>
          {isPostOwner ? (
            !edit ? (
              <EditIcon onClick={handleEdit} />
            ) : (
              <>
                <CheckIcon onClick={handleEdit} sx={{ marginBottom: "15px" }} />
                <br />
                <CloseIcon onClick={() => setEdit(!edit)} />
              </>
            )
          ) : (
            ""
          )}
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
