import React from "react";
import { StyledAvatar } from "./StyledAvatar";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import { useDropDown } from "../../context/DropDownContext";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

interface Props {
  justify?: string;
  margin?: string;
  backgroundColor?: string;
}

function Avatar({ justify, margin, backgroundColor }: Props) {
  const history = useHistory();
  const { showDropDown, setShowDropDown } = useDropDown();
  const { logout, user } = useAuth();
  const menuItems = [
    { title: "Add post", method: () => history.push("/create-post") },
    { title: "My posts", method: () => {} },
    {
      title: "Logout",
      method: () => {
        setShowDropDown(false);
        logout();
      },
    },
  ];

  return (
    <>
      <StyledAvatar
        onClick={() => setShowDropDown(!showDropDown)}
        justify={justify}
        margin={margin}
        backgroundcolor={backgroundColor}
      >
        {user && user.username.charAt(0).toUpperCase()}
      </StyledAvatar>
      <DropDownMenu menuItems={menuItems} />
    </>
  );
}

export default Avatar;
