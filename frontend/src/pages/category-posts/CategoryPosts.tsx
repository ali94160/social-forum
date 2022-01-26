import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/post-card/PostCard';
import LoadingSkeleton from '../../components/skeleton/LoadingSkeleton';
import { useCategory } from '../../context/CategoryContext';
import { usePost } from '../../context/PostContext';
import { CategoryItem } from '../../interfaces/Category';
import { PostItem } from '../../interfaces/Post';
import {StyledTitle} from './StyledCategoryPosts'

function CategoryPostsPage() {
  const { categoryId } = useParams<string | any>();
  const { posts, getPosts } = usePost();
  const { categories } = useCategory();
  const [category, setCategory] = useState<CategoryItem | null>(null)

  useEffect(() => {
    getPostsByCategory();
  }, [categoryId]);

  useEffect(() => {
    getCategory();
  }, [categoryId, categories]);
  
  const getCategory = () => {
    if (categories) {      
      let res = categories.find((cat: CategoryItem) => cat._id == categoryId);
      setCategory(res);
    }
  }

  const getPostsByCategory = async () => {
    await getPosts(true, true, categoryId);
  }

  return (
    <div style={{ height: "80vh" }}>
      {category && <StyledTitle>{category.title}</StyledTitle>}
      {posts && posts.length > 0 ? (
        posts.map((post: PostItem) => <PostCard key={post._id} post={post} />)
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}

export default CategoryPostsPage;
