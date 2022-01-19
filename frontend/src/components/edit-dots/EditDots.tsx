import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StyledDots, StyledBtn } from "./StyledEditDots";
import { usePost } from "../../context/PostContext";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import SearchModal from '../search-modal/SearchModal';

interface Props {
  postId: string;
}

function EditDots({ postId }: Props) {
  const { deletePost } = usePost();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    await deletePost(postId);
    setOpenModal(false);
  };

  const handleOpenConfirmModal = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };

  const handleCloseSearchModal = () => {
    setOpenSearchModal(false)
  }

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
      <MenuItem onClick={handleClose}>Handle moderators</MenuItem>
      <MenuItem onClick={handleClose}>Edit post</MenuItem>
      <MenuItem onClick={handleOpenConfirmModal}>Delete post</MenuItem>
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
      <ConfirmModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDeletePost={handleDeletePost}
      />
      <SearchModal
        isOpen={openSearchModal}
        handleClose={handleCloseSearchModal}
      />
    </>
  );
}

export default EditDots;
