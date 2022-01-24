import React, { createContext, useContext, useState } from "react";
import { Category } from "../../src/interfaces/Category";
const CategoryContext = createContext<any>(null);
export const useCategory = () => useContext(CategoryContext);

interface Props {
  children: any;
}


function CategoryContextProvider({ children }: Props) {
  const [categories, setCategories] = useState([
    {
      _id: "1",
      title: "Real Housewives",
      icon: ""
    },
        {
      _id: "2",
      title: "Real Housewives",
      icon: ""
    },    {
      _id: "3",
      title: "Real Housewives",
      icon: ""
    }
  ])

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

    return res.status === 200;
  }



  const values = {
    getCategories,
    addCategory,
    categories
  };

  return (
    <CategoryContext.Provider value={values}>{children}</CategoryContext.Provider>
  );
}

export default CategoryContextProvider;