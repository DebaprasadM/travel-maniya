import { useState } from "react";
import { createPost } from "../api/post";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Travel",
    image: "",
    date: new Date().toISOString().slice(0, 10),
    details: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDetailChange = (index, value) => {
    const updated = [...form.details];
    updated[index] = value;
    setForm({ ...form, details: updated });
  };

  const addDetail = () => {
    setForm({ ...form, details: [...form.details, ""] });
  };

  const removeDetail = (index) => {
    setForm({
      ...form,
      details: form.details.filter((_, i) => i !== index),
    });
  };

  // 🔥 CLOUDINARY UPLOAD FUNCTION
  const uploadToCloudinary = async () => {
    if (!imageFile) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "tourImages"); // your preset

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvvtxglsj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setUploading(false);
    return file.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageURL = form.image;

    if (imageFile) {
      imageURL = await uploadToCloudinary();
    }

    await createPost({ ...form, image: imageURL });

    navigate("/blogs");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        ✍️ Create New Blog Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full text-sm"
          />

          {uploading && <p className="text-emerald-600 mt-2">Uploading...</p>}

          {form.image && !imageFile && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-3 h-48 object-cover rounded-lg shadow"
            />
          )}

          {imageFile && (
            <p className="text-gray-600 mt-2">{imageFile.name}</p>
          )}
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Excerpt
          </label>
          <textarea
            name="excerpt"
            rows="3"
            value={form.excerpt}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          ></textarea>
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Content
          </label>
          <textarea
            name="content"
            rows="6"
            value={form.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          ></textarea>
        </div>

        {/* DETAILS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Extra Details
          </label>

          {form.details.map((d, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <input
                type="text"
                value={d}
                onChange={(e) => handleDetailChange(i, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg"
                placeholder={`Detail ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeDetail(i)}
                className="px-4 bg-red-500 text-white rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addDetail}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            + Add Detail
          </button>
        </div>

        {/* DATE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publish Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-xl shadow text-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Post ✓"}
        </button>
      </form>
    </div>
  );
}
