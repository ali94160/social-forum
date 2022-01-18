import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StyledDots, StyledBtn } from "./StyledEditDots";

function EditDots() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      <MenuItem onClick={handleClose}>Handle moderators</MenuItem>
      <MenuItem onClick={handleClose}>Edit post</MenuItem>
      <MenuItem onClick={handleClose}>Delete post</MenuItem>
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

export default EditDots;
