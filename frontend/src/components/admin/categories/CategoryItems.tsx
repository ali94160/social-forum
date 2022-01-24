
import React, { useState } from "react";
import { Category } from "../../../interfaces/Category";
import { useCategory } from "../../../context/CategoryContext";

function CategoryItems() {
  const { categories } = useCategory();

  return (
    <div>
      {categories.map((category: Category) => <p key={category._id}>{category.title}</p>)}
    </div>
  )
}

export default CategoryItems;
