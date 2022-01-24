
import React, { useState } from "react";
import { Category } from "../../../interfaces/Category";
import { useCategory } from "../../../context/CategoryContext";
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CategoryItems() {
  const { categories } = useCategory();

  return (
    <div>
      {categories.map((category: Category) => <p key={category._id}>{category.title}</p>)}
    <Grid container spacing={0}>
      <Grid item xs={8}>
        <p>Titel</p>
      </Grid>
      <Grid item xs={2}>
        <DeleteIcon/>
      </Grid>
      <Grid item xs={2}>
        <EditIcon />
      </Grid>
    </Grid>
    </div>
  )
}

export default CategoryItems;
