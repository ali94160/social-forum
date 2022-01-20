import { getInputAdornmentUtilityClass } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';

function AdminPage() {
  const { isAdmin } = useUser();
  const { whoAmI, me } = useAuth();
  const history = useHistory();
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    getAdmin();
    return () => {
      setStatus(0);
    }
  }, [me]);

  const getAdmin = async () => {
    const resStatus = await isAdmin();
    const res = await whoAmI();
    console.log('what is res status', resStatus);
    console.log('who am i ', res.body?.user);
    setStatus(resStatus);
  }

  console.log('what is status', status)

  if (status !== 200) {
    // if(status === 401)
    // setTimeout(() => {
    //   history.push('/');
    // }, 5000);

    return (
      <div>
        You are unauthorized...
      </div>
    )
  }

  console.log('i shouldnt be down here')

  return (
    <div>
      Hello you have access to homepage
    </div>
  );
}

export default AdminPage;
