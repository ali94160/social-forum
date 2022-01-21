import { useEffect, useState } from 'react';
import { StyledBanlist } from './StyledBanList';
import Card from '@mui/material/Card';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import CardActions from '@mui/material/CardActions';
import { useBan } from '../../../context/BanContext';
import BanItem from './BanItem';
import { Ban } from '../../../interfaces/Ban';
import List from '@mui/material/List';
import BanContainer from './BanContainer';

function BanList() {
  const [isOpen, setIsOpen] = useState(false);
  const { getBanlist, banlist } = useBan();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    handleBanlist();
  }, []);

  const handleBanlist = async () => {
    const status = await getBanlist();
    setStatus(status);
  }

  const StyledExpandMore = styled((props): any => {
    const { expand, ...other }: any = props;
    return <IconButton {...other} />;
        })(({ theme, expand}: any) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
      }),
    }));


  return (
    <Card elevation={isOpen ? 0 : 1} onClick={() => setIsOpen(!isOpen)}>
      <StyledBanlist isOpen={isOpen}>
         <CardActions disableSpacing>
          <p>Banlist</p>
          <StyledExpandMore
            expand={isOpen} 
          >
            <KeyboardArrowDownIcon />
          </StyledExpandMore>
        </CardActions>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <BanContainer ban={ban} />
        </Collapse>
      </StyledBanlist>
    </Card>
  );
}

export default BanList;
