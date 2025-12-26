import React, { useEffect, useState } from "react";
import { getTours, deleteTour } from "../api/tour";
import TourCard from "./TourCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ToursList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await getTours({ page: 1, limit: 12 });
      setTours(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    try {
      await deleteTour(id);
      setTours((prev) => prev.filter((t) => t._id !== id));
      toast.success("Tour deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete!");
      console.log("Delete failed: " + (err.message || "error"));
    }
  };

  const handleEdit = (tour) => {
    console.log("edit", tour);
  };

  if (loading) return <div className="text-center py-20">Loading tours…</div>;
  if (error) return <div className="text-center py-20">Error: {error}</div>;

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-12 overflow-hidden">
      
      {/* 🎨 Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-400/30 blur-[120px] rounded-full -top-32 -left-20 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-400/30 blur-[150px] rounded-full -top-20 right-0 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/30 blur-[120px] rounded-full -bottom-40 left-1/3 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-400/20 blur-[100px] rounded-full top-1/2 left-2/3 animate-ping"></div>
      </div>

      {/* Header + Create Button */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Tours</h2>
        <Link
          to="/create-tour"
          className="
            bg-emerald-600 text-white 
            px-4 py-2 rounded-lg shadow 
            hover:bg-emerald-700 
            transition text-sm font-medium
          "
        >
          + Create Tour
        </Link>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 relative z-10">
        {tours.map((tour) => (
          <TourCard
            key={tour._id}
            tour={{
              id: tour._id,
              title: tour.title,
              price: tour.price,
              excerpt: tour.excerpt,
              days: tour.days,
              image: tour.image?.url || tour.image,

            }}
            onEdit={() => handleEdit(tour)}
            onDelete={() => handleDelete(tour._id)}
          />
        ))}
      </div>
    </section>
  );
}
