import { useState, useEffect } from 'react';
import { Ban } from '../../../interfaces/Ban';
import TableRow from '@mui/material/TableRow';
import {
  StyledUnbanBtn,
  StyledTableCell,
  StyledSpan
} from './StyledBanList';
import { useBan } from '../../../context/BanContext';
import PasswordModal from '../password-validation/PasswordModal';

interface Props {
  ban: Ban;
  index: number;
}

function BanItem({ban, index}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(0);
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
    if (res === 200) {
      setIsOpen(!isOpen);
    }
  }

  return (
     <><TableRow
      // key={ban._id}
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
        <PasswordModal
          isOpen={isOpen}
          password={password}
          setPassword={setPassword}
          status={status}
          setIsOpen={setIsOpen}
          setStatus={setStatus}
          handleConfirm={handleUnban}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        >
          <p>Email: <StyledSpan>{ban.email}</StyledSpan></p>
          <p>Ip: <StyledSpan>{ban.ip}</StyledSpan></p>
          <p>Reason: <StyledSpan>{ban.reason}</StyledSpan></p>
          <p>Ban date: <StyledSpan>{dateStr}</StyledSpan></p>
        </PasswordModal>
      }
    </>
  )
}

export default BanItem;
