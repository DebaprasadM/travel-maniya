import { useEffect, useState } from "react";
import { getTour, updateTour } from "../api/tour";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    excerpt: "",
    days: "",
    image: "",
    imageFile: null, // 🔥 NEW
    details: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTour(id);
        setForm({
          ...res.data,
          imageFile: null, // default
          details: res.data.details || [],
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Unable to load tour!");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (index, value) => {
    const updated = [...form.details];
    updated[index] = value;
    setForm({ ...form, details: updated });
  };

  const addDetail = () => {
    setForm({ ...form, details: [...form.details, ""] });
  };

  const removeDetail = (index) => {
    const updated = form.details.filter((_, i) => i !== index);
    setForm({ ...form, details: updated });
  };

  // ⭐ CLOUDINARY UPLOAD (Same as Create Tour)
  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append("file", form.imageFile);
    data.append("upload_preset", "tourImages");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvvtxglsj/image/upload",
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = form.image;

      // 🔥 If user selected new image → upload to Cloudinary
      if (form.imageFile) {
        imageURL = await uploadToCloudinary();
      }

      const payload = {
        ...form,
        image: imageURL,
      };

      delete payload.imageFile;

      await updateTour(id, payload);

      toast.success("Tour updated successfully!");
      setTimeout(() => navigate("/tours"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-12">

      <div className="absolute inset-0 bg-black"></div>

      <div
        className="absolute inset-0 blur-3xl opacity-70 animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(0,255,200,0.4), transparent 60%), radial-gradient(circle at 80% 30%, rgba(0,150,255,0.35), transparent 60%), radial-gradient(circle at 50% 80%, rgba(180,0,255,0.4), transparent 60%)",
        }}
      ></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 w-[140%] h-[200px] bg-gradient-to-r from-purple-500/40 via-blue-400/40 to-emerald-400/40 blur-3xl animate-[slide_12s_linear_infinite]"></div>
        <div className="absolute top-40 -left-1/3 w-[150%] h-[220px] bg-gradient-to-r from-emerald-400/40 via-purple-400/40 to-blue-400/40 blur-3xl animate-[slide_10s_linear_infinite_reverse]"></div>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(30%); }
        }
      `}</style>

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="backdrop-blur-2xl bg-white/10 shadow-2xl rounded-2xl p-8 border border-white/20">

          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-300 to-blue-300 text-transparent bg-clip-text">
            Edit Tour
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="title"
              placeholder="Tour Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />

            <input
              type="text"
              name="excerpt"
              placeholder="Short Description"
              value={form.excerpt}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />

            <input
              type="text"
              name="days"
              placeholder="Duration"
              value={form.days}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />

            {/* 🔥 NEW: Image File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, imageFile: e.target.files[0] })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            />

            {/* Show old image preview */}
            <img
              src={form.image}
              alt="preview"
              className="w-32 h-20 rounded-lg border border-white/30 mt-2 object-cover"
            />

            {/* DETAILS */}
            <div>
              <label className="text-white font-medium">Tour Details</label>

              {form.details.map((detail, index) => (
                <div key={index} className="flex gap-3 mt-3">
                  <textarea
                    value={detail}
                    onChange={(e) =>
                      handleDetailChange(index, e.target.value)
                    }
                    className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeDetail(index)}
                    className="px-4 bg-red-500/80 text-white rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addDetail}
                className="mt-4 px-4 py-2 bg-emerald-400 text-black font-semibold rounded-lg shadow hover:scale-105 transition"
              >
                + Add Detail
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-blue-500 text-black font-semibold shadow-xl hover:scale-[1.02] transition-all"
            >
              Update Tour
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
