import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import TextBox from '../../components/admin/textbox/TextBox';
import BanList from '../../components/admin/banlist/BanList';
import Grid from '@mui/material/Grid';
import CategoryCollapse from '../../components/admin/categories/CategoryCollapse';
import { StyledGrid } from './StyledAdmin';

function AdminPage() {
  const { isAdmin } = useUser();
  const { user } = useAuth();
  const history = useHistory();
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    getAdmin();
    return () => {
      setStatus(0);
    }
  }, [user]);

  const getAdmin = async () => {
    const resStatus = await isAdmin();
    setStatus(resStatus);
  }

  if (status !== 200) {
    if(status === 401)
    setTimeout(() => {
      history.push('/');
    }, 5000);
    
    return (
      <div>
        You are unauthorized...
      </div>
    )
  }

  return (
    <Grid container spacing={2}>
      <StyledGrid item xs={12}>
        <TextBox />
      </StyledGrid>
       <StyledGrid item xs={12}>
        <BanList />
      </StyledGrid>
      <StyledGrid item xs={12}>
        <CategoryCollapse/>
      </StyledGrid>
    </Grid>
  );
}

export default AdminPage;
