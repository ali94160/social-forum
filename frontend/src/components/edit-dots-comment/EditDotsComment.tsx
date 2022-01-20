import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StyledDots, StyledBtn } from "./StyledEditDots";
import { useComment } from "../../context/CommentContext";

interface Props {
  commentId: string;
}

function EditDotsComment({ commentId }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = async () => {
    setOpenModal(false);
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
      <MenuItem onClick={() => {console.log ('wow ban'); handleClose(); }}>Ban user</MenuItem>
      <MenuItem onClick={() => {console.log ('wow delete'); handleClose(); }}>Delete comment</MenuItem>
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
