import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTour } from "../api/tour";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getTour(id);
        setTour(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading…</div>;
  if (!tour) return <div className="p-10 text-center">Tour not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden shadow-xl">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mt-6 text-gray-800">
        {tour.title}
      </h1>

      {/* EXCERPT */}
      <p className="text-gray-600 text-lg mt-2">{tour.excerpt}</p>

      {/* DATE */}
      <p className="text-gray-500 mt-2 text-sm">
        Posted on {new Date(tour.createdAt).toLocaleDateString()}
      </p>

      {/* PRICE + DAYS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="p-5 bg-white border rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Price</h3>
          <p className="text-emerald-600 font-bold text-2xl">
            ₹ {tour.price}
          </p>
        </div>

        <div className="p-5 bg-white border rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
          <p className="text-gray-700 text-xl">
            {tour.days}
          </p>
        </div>

      </div>

      {/* DETAILS LIST */}
      {tour.details?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tour Details
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            {tour.details.map((d, index) => (
              <li key={index}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      {/* BACK */}
      <div className="mt-12">
        <Link
          to="/tours"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black"
        >
          ← Back to Tours
        </Link>
      </div>
    </div>
  );
}
