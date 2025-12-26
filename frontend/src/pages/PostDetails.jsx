import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../api/post";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPost(id);
        setPost(res.data); // backend: { success, data }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading…</div>;
  if (!post) return <div className="p-10 text-center">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Image */}
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={post.image}
          className="w-full h-80 object-cover"
          alt={post.title}
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mt-6 text-gray-800">{post.title}</h1>

      {/* Category */}
      <p className="mt-2 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {post.category}
      </p>

      {/* Publish Date */}
      <p className="mt-2 text-gray-500 text-sm">
        Published on {new Date(post.date).toLocaleDateString()}
      </p>

      {/* Excerpt */}
      <p className="mt-6 text-gray-700 text-lg italic">{post.excerpt}</p>

      {/* Full Content */}
      <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>

      {/* Details[] */}
      {post.details?.length > 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Additional Details
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            {post.details.map((d, index) => (
              <li key={index}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-10">
        <Link
          to="/blogs"
          className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
        >
          ← Back to Blogs
        </Link>
      </div>

    </div>
  );
}
