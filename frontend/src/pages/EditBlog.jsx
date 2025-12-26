import { useEffect, useState } from "react";
import { getPost, updatePost } from "../api/post";
import { useParams, useNavigate } from "react-router-dom";

// ================== Cloudinary Upload Function ==================
const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "tourImages"); // <-- আপনার preset
  data.append("cloud_name", "dvvtxglsj");     // <-- আপনার cloud name

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dvvtxglsj/image/upload",
    { method: "POST", body: data }
  );
  const result = await res.json();
  return result.secure_url;
};

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    date: "",
    details: [],
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ================== Load Post Data ==================
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getPost(id);
        setForm(res.data);
      } catch {
        alert("Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  // ================== Handlers ==================
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDetailChange = (index, value) => {
    const updated = [...form.details];
    updated[index] = value;
    setForm({ ...form, details: updated });
  };

  const addNewDetail = () => {
    setForm({ ...form, details: [...form.details, ""] });
  };

  const removeDetail = (index) => {
    const updated = form.details.filter((_, i) => i !== index);
    setForm({ ...form, details: updated });
  };

  // ================== Cloudinary Image Upload ==================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, form);
      navigate("/blogs");
    } catch (err) {
      alert("Update failed!");
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  // ================== JSX ==================
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6">✏️ Edit Blog Post</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-3 rounded"
          />
          {uploading && (
            <p className="text-blue-600 mt-2">Uploading image...</p>
          )}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="h-48 rounded shadow mt-3 object-cover"
            />
          )}
        </div>

        {/* Excerpt */}
        <textarea
          name="excerpt"
          placeholder="Short Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="w-full border p-3 rounded h-24"
        />

        {/* Full Content */}
        <textarea
          name="content"
          placeholder="Full Content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-3 rounded h-40"
        />

        {/* Details Array */}
        <div>
          <label className="font-semibold">Details (Editable)</label>
          <div className="space-y-3 mt-3">
            {form.details?.map((detail, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  className="flex-1 border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addNewDetail}
            className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded"
          >
            + Add Detail
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg mt-2"
        >
          Update Blog ✓
        </button>

      </form>
    </div>
  );
}
