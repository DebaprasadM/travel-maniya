import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Sending message...", {
      style: {
        background: "linear-gradient(135deg, #14532d, #052e16)",
        color: "#ecfdf5",
        borderRadius: "14px",
      },
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success("Message sent successfully 🌿", {
          id: toastId,
          style: {
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            color: "#ecfdf5",
            borderRadius: "14px",
          },
          iconTheme: {
            primary: "#bbf7d0",
            secondary: "#14532d",
          },
        });

        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!", {
        id: toastId,
        style: {
          background: "linear-gradient(135deg, #7f1d1d, #450a0a)",
          color: "#fff",
          borderRadius: "14px",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block text-green-200 font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          className="w-full p-3 rounded-xl bg-white/90 text-gray-800
          border border-green-300 focus:outline-none
          focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-green-200 font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="w-full p-3 rounded-xl bg-white/90 text-gray-800
          border border-green-300 focus:outline-none
          focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-green-200 font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full p-3 rounded-xl bg-white/90 text-gray-800
          border border-green-300 focus:outline-none
          focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-green-200 font-medium mb-1">
          Message
        </label>
        <textarea
          rows="4"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Write your message"
          className="w-full p-3 rounded-xl bg-white/90 text-gray-800
          border border-green-300 focus:outline-none
          focus:ring-2 focus:ring-green-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl text-lg font-semibold text-white
        bg-gradient-to-r from-green-600 to-emerald-600
        hover:from-green-700 hover:to-emerald-700
        transition shadow-lg hover:shadow-green-500/40"
      >
        Send Message
      </button>
    </form>
  );
}
