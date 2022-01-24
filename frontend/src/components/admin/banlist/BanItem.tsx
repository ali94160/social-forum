import { useState, BaseSyntheticEvent, useEffect } from 'react';
import { Ban } from '../../../interfaces/Ban';
import TableRow from '@mui/material/TableRow';
import {
  StyledUnbanBtn,
  StyledInputContainer,
  StyledCloseButton,
  StyledButtonContainer,
  StyledUnban,
  StyledTableCell,
  StyledSpan
} from './StyledBanList';
import { StyledTealButton } from "../../basics/StyledTealButton";
import BasicModal from '../../basics/basic-modal/BasicModal';
import BasicVisibilityInput from "../../basics/basic-visibility-input/BasicVisibilityInput";
import { useBan } from '../../../context/BanContext';

interface Props {
  ban: Ban;
  index: number;
}

function BanItem({ban, index}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const { unbanUser } = useBan();
  const date = new Date(ban.banDate);
  const dateStr = date.toLocaleDateString();

  useEffect(() => {
    return () => {
      setPassword('');
    }
  }, []);
   

  const handleUnban = async () => {
    const res = await unbanUser({id: ban._id, password});
    setStatus(res);
    console.log('what is res status', res)
    if (res !== 200) {
      setStatusMsg('Bad input')
    } else if (res === 200) {
      setStatusMsg('')
      setIsOpen(!isOpen);
    }
  }

  return (
     <><TableRow
      key={ban._id}
      sx={{backgroundColor: index % 2 ? 'var(--light-teal)' : 'white'}}
    >
      <StyledTableCell component="th" scope="row">
        {ban.email}
      </StyledTableCell>
      <StyledTableCell align="left">{ban.ip}</StyledTableCell>
      <StyledTableCell align="left">{ban.reason}</StyledTableCell>
      <StyledTableCell align="left">{dateStr}</StyledTableCell>
      <StyledTableCell align="center">
        <StyledUnbanBtn size="small" onClick={() => setIsOpen(!isOpen)}>
          Unban
        </StyledUnbanBtn>
      </StyledTableCell>
    </TableRow>
      {isOpen &&
        <BasicModal isOpen={isOpen} handleClose={setIsOpen}>
        <StyledUnban>
          <p>Email: <StyledSpan>{ban.email}</StyledSpan></p>
          <p>Ip: <StyledSpan>{ban.ip}</StyledSpan></p>
          <p>Reason: <StyledSpan>{ban.reason}</StyledSpan></p>
          <p>Ban date: <StyledSpan>{dateStr}</StyledSpan></p>
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
            error={status !== 200 && status !== 0}
          />
          {status !== 200 && status !== 0 && statusMsg}
        </StyledInputContainer>
        <StyledButtonContainer>
          <StyledCloseButton
            type="button"
            variant="contained"
            onClick={() =>
            {
              setIsOpen(!isOpen);
              setPassword('');
              setStatusMsg('');
              setStatus(0);
            }}
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
