
import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Category } from "../../../interfaces/Category";

interface Props {
  category: Category,
}

function CategoryItem({ category }: Props) {

  return (
    <Grid container spacing={0}>
      <Grid item xs={8}>
        {category.title}
      </Grid>
      <Grid item xs={2}>
        <DeleteIcon />
      </Grid>
      <Grid item xs={2}>
        <EditIcon />
      </Grid>
    </Grid>
  )
}

export default CategoryItem;
