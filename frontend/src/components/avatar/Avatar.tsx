import React from "react";
import { StyledAvatar } from "./StyledAvatar";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import { useDropDown } from "../../context/DropDownContext";
import { useAuth } from "../../context/AuthContext";

interface Props {
  justify?: string;
  margin?: string;
  backgroundColor?: string;
}

function Avatar({ justify, margin, backgroundColor }: Props) {
  const { showDropDown, setShowDropDown } = useDropDown();
  const { logout, user } = useAuth();
  const menuItems = [
    { title: "Add post", method: () => {} },
    { title: "My posts", method: () => {} },
    { title: "Logout", method: logout },
  ];

  const test = () => {
    console.log("inne");
    setShowDropDown(!showDropDown);
  };

  return (
    <>
      <StyledAvatar
        onClick={test}
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
