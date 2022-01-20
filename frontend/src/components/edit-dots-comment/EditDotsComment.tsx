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
  const [openModal, setOpenModal] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteMyComment = async () => {
    console.log ('wow delete', commentId);
    handleClose();
  };

  // ta bort sin kommentar

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
      <MenuItem onClick={() => {console.log ('wow ban'); handleClose(); }}>Ban user</MenuItem> {/* visible to who? */}
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
