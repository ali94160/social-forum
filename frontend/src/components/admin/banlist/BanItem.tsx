import React from 'react';
import { Ban } from '../../../interfaces/Ban';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { StyledUnbanBtn } from './StyledBanList';

interface Props {
  ban: Ban
}

function BanItem({ban}: Props) {
  console.log('ban from item', ban)

  const handleUnban = async () => {
    console.log('i want to unban id', ban._id);
  }

  return (
     <TableRow
      key={ban._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {ban.email}
      </TableCell>
      <TableCell align="left">{ban.ip}</TableCell>
      <TableCell align="left">{ban.reason}</TableCell>
      <TableCell align="center"><StyledUnbanBtn size="small" onClick={handleUnban}>Unban</StyledUnbanBtn></TableCell>
    </TableRow>
  );
}

export default BanItem;
