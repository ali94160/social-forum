import React from "react";
import { Category } from "../../../interfaces/Category";
import Card from '@mui/material/Card';
import CategoryItem from './CategoryItem';
import { useCategory } from "../../../context/CategoryContext";


function CategoriesList() {
  const { categories } = useCategory();

  return (
    <Card>
      {categories.map((category: Category) =>
        <CategoryItem key={category._id} category={category} />
      )}
    </Card> 
  )
}

export default CategoriesList;
