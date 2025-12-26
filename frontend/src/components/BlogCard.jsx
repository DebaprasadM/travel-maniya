import { Link } from "react-router-dom";

export default function BlogCard({ post, onDelete }) {
  const displayDate = post.date ? new Date(post.date).toLocaleDateString() : "";

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
      {/* IMAGE */}
      <div className="relative overflow-hidden h-56">
        <div className="absolute inset-0 bg-gray-300 blur-xl transition-opacity"></div>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-all duration-700 opacity-0 absolute inset-0"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousSibling.style.opacity = 0;
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
          {post.category}
        </span>

        <h3 className="text-xl font-semibold mt-3 text-gray-800 group-hover:text-emerald-600 transition">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/blog/${post._id}`}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Read More →
          </Link>
          {/* BUTTONS */}
          <div className=" flex items-center gap-3">
            <Link
              to={`/edit-blog/${post._id}`}
              className=" text-sm text-blue-600 
                hover:text-blue-800 
                transition font-medium"
            >
              Edit
            </Link>

            <button
              onClick={() => onDelete(post._id)}
              className="text-red-600 hover:text-red-800  font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
