import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../api/post';
import BlogGrid from '../components/BlogGrid';

export default function BlogsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts({ page: 1, limit: 12 });
      // res = { success, data, total }
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await deletePost(id);
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  if (loading) return <div>Loading...</div>;
 return (
  <BlogGrid 
    posts={posts} 
    onDelete={handleDelete} 
  />
);
}
