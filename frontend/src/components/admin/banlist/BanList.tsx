import { useState } from 'react';
import { StyledBanlist } from './StyledBanList';
import Card from '@mui/material/Card';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import CardActions from '@mui/material/CardActions';

function BanList() {
  const [isOpen, setIsOpen] = useState(false);

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
          put ban list here
        </Collapse>
      </StyledBanlist>
    </Card>
  );
}

export default BanList;
