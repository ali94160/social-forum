import React, { useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StyledDots, StyledBtn } from "./StyledEditDots";
import { useComment } from "../../context/CommentContext";

interface Props {
  commentId: string;
  isCommentOwner: boolean;
  hasDeleteAccess: boolean;
  postId: string;
}

function EditDotsComment({
  commentId,
  isCommentOwner,
  hasDeleteAccess,
  postId,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { deleteMyComment, deleteComment, getComments } = useComment();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (deleteMethod:Function) => {
    const isSuccess = await deleteMethod(commentId);
    if (isSuccess) {
      getComments(postId);
    }
    handleClose();
  };

  const renderMenu = () => (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {isCommentOwner
        ? <MenuItem onClick={() => handleDelete(deleteMyComment)}>Delete my comment</MenuItem>
        : hasDeleteAccess && <MenuItem onClick={()=> handleDelete(deleteComment)}>Delete comment</MenuItem>}
    </Menu>
  );

  return (
    <>
      <StyledBtn
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleClick(e)}
      >
        <StyledDots />
      </StyledBtn>
      {renderMenu()}
    </>
  );
}

export default EditDotsComment;
