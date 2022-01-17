import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDropDown } from "../../context/DropDownContext";
import { StyledMenu } from "./StyledDropDownMenu";

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
    <StyledMenu
      id="basic-menu"
      open={showDropDown}
      onClose={handleClose}
      autoFocus={false}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {menuItems.map((item) => (
        <MenuItem onClick={() => item.method()} key={item.title}>
          {item.title}
        </MenuItem>
      ))}
    </StyledMenu>
  );
}

export default DropDownMenu;
