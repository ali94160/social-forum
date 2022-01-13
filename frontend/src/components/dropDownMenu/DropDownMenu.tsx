import React, { useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDropDown } from "../../context/DropDownContext";

interface Props {
  menuItems: {
    title: string;
    method: () => void;
  }[];
}

function DropDownMenu({ menuItems }: Props) {
  const { showDropDown, setShowDropDown } = useDropDown();
  const handleClose = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <Menu
      id="basic-menu"
      open={showDropDown ? showDropDown : false}
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
        <MenuItem onClick={() => item.method()} key={item.title}>
          {item.title}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default DropDownMenu;
