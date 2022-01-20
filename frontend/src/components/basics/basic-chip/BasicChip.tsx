import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {StyledChip} from './StyledBasicChip'

interface Props {
  username: string;
  handleClick: Function;
  deleteable: boolean;
}

function BasicChip({ username, handleClick, deleteable }: Props) {
  return (
    <StyledChip
      onClick={handleClick()}
      avatar={<Avatar>{username.charAt(0).toUpperCase()}</Avatar>}
      label={username}
      onDelete={deleteable ? () => handleClick() : undefined}
    />
  );
}

export default BasicChip;
