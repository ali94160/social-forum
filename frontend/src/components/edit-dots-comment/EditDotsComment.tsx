import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StyledDots, StyledBtn } from "./StyledEditDots";
import { useComment } from "../../context/CommentContext";

interface Props {
  commentId: string;
  isCommentOwner: boolean;
}

function EditDotsComment({ commentId, isCommentOwner }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {deleteMyComment} = useComment();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteMyComment = async () => {
    const isSuccess = await deleteMyComment(commentId);
    if(isSuccess){
      // update comments list.
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
      <MenuItem onClick={() => {console.log ('wow ban'); handleClose(); }}>Ban user</MenuItem> {/* visible to admin*/}
      {isCommentOwner && <MenuItem onClick={handleDeleteMyComment}>Delete my comment</MenuItem>}
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
