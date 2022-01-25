import React, { createContext, useContext, useState, useEffect } from "react";
import { Category } from "../../src/interfaces/Category";
const CategoryContext = createContext<any>(null);
export const useCategory = () => useContext(CategoryContext);

interface Props {
  children: any;
}


function CategoryContextProvider({ children }: Props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res: Response = await fetch("/api/categories")
    try {
      const body = await res.json();
      setCategories(body);
    }
    catch (error) {
      setCategories([])
    }
    return res.status === 200;
  }

  const addCategory = async (category: Category) => {
    const res: Response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(category),
    });

    getCategories();
    return res.status === 200;
  }

  const deleteCategory = async (categoryId: string) => {
    const res = await fetch('/api/categories/' + categoryId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    getCategories();
    return res.status === 200;
  }

  const values = {
    getCategories,
    addCategory,
    deleteCategory,
    categories
  };

  return (
    <CategoryContext.Provider value={values}>{children}</CategoryContext.Provider>
  );
}

export default CategoryContextProvider;