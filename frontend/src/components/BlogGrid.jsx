import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

export default function BlogGrid({ posts, onDelete }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Top Heading + Create Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Latest Travel Blogs
        </h2>

        <Link
          to="/create-post"
          className="
            bg-emerald-600 text-white 
            px-4 py-2 rounded-lg shadow 
            hover:bg-emerald-700 
            transition text-sm font-medium
          "
        >
          + Create Post
        </Link>
      </div>

      {/* Blog Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((p) => (
          <BlogCard key={p._id || p.id} post={p} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}
