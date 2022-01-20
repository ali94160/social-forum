import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

interface Props {
  username: string;
  handleClick: Function;
}

function BasicChip({ username, handleClick }: Props) {
  return (
    <Chip
      onClick={() => handleClick()}
      avatar={<Avatar>{username.charAt(0).toUpperCase()}</Avatar>}
      label={username + "  +"}
    />
  );
}

export default BasicChip;
