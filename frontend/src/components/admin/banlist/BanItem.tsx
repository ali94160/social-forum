import { useState, BaseSyntheticEvent } from 'react';
import { Ban } from '../../../interfaces/Ban';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { StyledUnbanBtn, StyledInputContainer, StyledCloseButton, StyledButtonContainer, StyledUnban } from './StyledBanList';
import { StyledTealButton } from "../../basics/StyledTealButton";
import BasicModal from '../../basics/basic-modal/BasicModal';
import BasicVisibilityInput from "../../basics/basic-visibility-input/BasicVisibilityInput";

interface Props {
  ban: Ban
}

function BanItem({ban}: Props) {
  console.log('ban from item', ban)
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleUnban = async () => {
    console.log('i want to unban id', ban._id);
  }

  return (
     <><TableRow
      key={ban._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {ban.email}
      </TableCell>
      <TableCell align="left">{ban.ip}</TableCell>
      <TableCell align="left">{ban.reason}</TableCell>
      <TableCell align="left">{ban.banDate}</TableCell>
      <TableCell align="center">
        <StyledUnbanBtn size="small" onClick={() => setIsOpen(!isOpen)}>
          Unban
        </StyledUnbanBtn>
      </TableCell>
    </TableRow>
      {isOpen &&
        <BasicModal isOpen={isOpen} handleClose={setIsOpen}>
        <StyledUnban>
          Email: {ban.email}<br />
          Ip: {ban.ip}<br />
          Reason: {ban.reason}<br />
          Ban date: {ban.banDate}
        </StyledUnban>
          <StyledInputContainer>
            <BasicVisibilityInput
              value={password}
              variant="outlined"
              label="Password"
              showText={showPassword}
              setShowText={setShowPassword}
              handleChange={(ev: BaseSyntheticEvent) =>
                setPassword(ev.target.value)
              }
              required
            />
        </StyledInputContainer>
        <StyledButtonContainer>
          <StyledCloseButton
            type="button"
            variant="contained"
            onClick={() => setIsOpen(!isOpen)}
          >
            Cancel
          </StyledCloseButton>
          <StyledTealButton
            type="submit"
            variant="contained"
            onClick={handleUnban}
          >
            Confirm
          </StyledTealButton>
        </StyledButtonContainer>
        </BasicModal>}
    </>
  )
}

export default BanItem;
