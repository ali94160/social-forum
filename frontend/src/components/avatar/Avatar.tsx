import React from "react";
import { StyledAvatar } from "./StyledAvatar";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import { useDropDown } from "../../context/DropDownContext";

interface Props {
  justify?: string;
  margin?: string;
  backgroundColor?: string;
}

function Avatar({ justify, margin, backgroundColor }: Props) {
  const { showDropDown, toggleDropDown } = useDropDown();
  const menuItems = [
    { title: "Add post", path: "/addPost" },
    { title: "My posts", path: "/myPosts" },
    { title: "Logout" },
  ];

  return (
    <>
      <StyledAvatar
        onClick={() => toggleDropDown()}
        justify={justify}
        margin={margin}
        backgroundcolor={backgroundColor}
      >
        A
      </StyledAvatar>
      <DropDownMenu menuItems={menuItems} />
    </>
  );
}

export default Avatar;
