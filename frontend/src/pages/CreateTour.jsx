import { useState } from "react";
import { createTour } from "../api/tour";
import { useNavigate } from "react-router-dom";

export default function CreateTour() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    excerpt: "", 
    days: "",
    image: "",
    imageFile: null, // NEW for Cloudinary upload
    details: [""],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, imageFile: file });
  };

  const handleDetailChange = (index, value) => {
    const newDetails = [...form.details];
    newDetails[index] = value;
    setForm({ ...form, details: newDetails });
  };

  const addDetail = () => {
    setForm({ ...form, details: [...form.details, ""] });
  };

  const removeDetail = (index) => {
    const newDetails = form.details.filter((_, i) => i !== index);
    setForm({ ...form, details: newDetails });
  };

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append("file", form.imageFile);
data.append("upload_preset", "tourImages");
    const res = await fetch("https://api.cloudinary.com/v1_1/dvvtxglsj/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = form.image;

      if (form.imageFile) {
        imageURL = await uploadToCloudinary();
      }

      await createTour({ ...form, image: imageURL });
      navigate("/tours");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Tour</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Tour title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="excerpt"
          placeholder="Short description"
          value={form.excerpt}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="days"
          placeholder="Duration (days)"
          value={form.days}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* CLOUDINARY FILE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        {/* Optional manual URL */}
        <input
          type="text"
          name="image"
          placeholder="Or paste Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* -------------------- DETAILS INPUTS -------------------- */}
        <div>
          <label className="font-semibold text-gray-700">Tour Details</label>

          {form.details.map((detail, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <textarea
                value={detail}
                onChange={(e) => handleDetailChange(i, e.target.value)}
                placeholder={`Detail ${i + 1}`}
                className="w-full border p-2 rounded"
              />

              {form.details.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDetail(i)}
                  className="px-3 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addDetail}
            className="mt-2 px-4 py-1 bg-emerald-200 text-emerald-800 rounded hover:bg-emerald-300"
          >
            + Add More Details
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
        >
          Create Tour
        </button>
      </form>
    </div>
  );
}