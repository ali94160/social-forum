import React from "react";
import { Category } from "../../../interfaces/Category";
import CategoryItem from './CategoryItem';
import { useCategory } from "../../../context/CategoryContext";

function CategoriesList() {
  const { categories } = useCategory();

  return (
    <div>
      {categories.map((category: Category) =>
        <CategoryItem key={category._id} category={category} />
      )}
    </div>
  )
}

export default CategoriesList;
