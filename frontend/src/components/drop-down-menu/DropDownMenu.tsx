import MenuItem from "@mui/material/MenuItem";
import { StyledMenu } from "./StyledDropDownMenu";

interface Props {
  menuItems: {
    title: string;
    method: () => void;
  }[];
  anchorEl: null | HTMLElement;
  setAnchorEl: Function;
}

interface MenuItem {
  title: string;
  method: () => void;
}

function DropDownMenu({ menuItems, anchorEl, setAnchorEl }: Props) {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleClick = (item: MenuItem) => {
    item.method();
    handleClose();
  };

  return (
    <StyledMenu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
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
        <MenuItem onClick={() => handleClick(item)} key={item.title}>
          {item.title}
        </MenuItem>
      ))}
    </StyledMenu>
  );
}

export default DropDownMenu;
