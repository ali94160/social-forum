import { Ban } from '../../../interfaces/Ban';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BanItem from './BanItem';
import { StyledTableHead } from './StyledBanList';

interface Props {
  banlist: Ban[]
}

function BanContainer({banlist}: Props) {
  return (
     <TableContainer component={Paper}>
      <Table size="small">
        <StyledTableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="left">Ip</TableCell>
            <TableCell align="left">Reason</TableCell>
            <TableCell align="left">Ban date</TableCell>
            <TableCell align="center">Unban</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {banlist.map((ban) =>
           <BanItem ban={ban} key={ban._id} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BanContainer;
