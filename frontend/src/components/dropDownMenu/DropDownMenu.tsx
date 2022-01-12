import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDropDown } from "../../context/DropDownContext";

interface Props {
  menuItems: {
    title: string;
    path?: string;
  }[];
}

function DropDownMenu({ menuItems }: Props) {
  const { showDropDown, toggleDropDown } = useDropDown();
  const open = showDropDown;
  const handleClose = () => {
    toggleDropDown();
  };

  return (
    <Menu
      id="basic-menu"
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.title}>{item.title}</MenuItem>
      ))}
    </Menu>
  );
}

export default DropDownMenu;
