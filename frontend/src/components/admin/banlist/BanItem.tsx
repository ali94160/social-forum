import React from 'react';
import { Ban } from '../../../interfaces/Ban';
import Grid from '@mui/material/Grid';

interface Props {
  ban: Ban
}

function BanItem({ban}: Props) {
  console.log('ban from item', ban)

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        {ban.email}
      </Grid>
      <Grid item xs={2}>
        {ban.ip}
      </Grid>
      <Grid item xs={3}>
        {ban.reason}
      </Grid>
      <Grid item xs={2}>
        {ban.reason}
      </Grid>
      <Grid item xs={2}>
        unban
      </Grid>
    </Grid>
  );
}

export default BanItem;
