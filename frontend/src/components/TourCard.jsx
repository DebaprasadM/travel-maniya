import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function TourCard({ tour, onEdit, onDelete }) {

  const handleDeleteClick = () => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    try {
      onDelete?.(tour.id);
      toast.success("Tour deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete tour!");
    }
  };

  return (
    <article className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group transform hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <img
          src={tour.image?.url || tour.image}

          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        {/* Price Tag */}
        <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 text-sm font-semibold rounded-xl shadow-md text-gray-800 border border-gray-200">
          {tour.price}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-[220px]">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
            {tour.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {tour.excerpt}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/tour/${tour.id}`}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 text-sm font-medium"
          >
            View Details
          </Link>

          <div className="flex gap-2">
            <Link
              to={`/edit-tour/${tour.id}`}
              className="px-3 py-1 text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 hover:scale-105 transition-transform duration-300"
            >
              Edit
            </Link>
            <button
              onClick={handleDeleteClick}
              className="px-3 py-1 text-red-600 font-medium border border-red-200 rounded-lg hover:bg-red-50 hover:scale-105 transition-transform duration-300"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Duration */}
        <span className="text-xs text-gray-500 mt-2 block italic">
          Duration: {`${tour.days} days` || "2–3 Days"}
        </span>
      </div>
    </article>
  );
}
