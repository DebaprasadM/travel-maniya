import { useState } from "react";
import { adminLogin } from "../api/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(form);
      localStorage.setItem("adminToken", res.token);
      toast.success("Welcome back, Admin 👋");
      navigate("/admin/messages");
    } catch {
      toast.error("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">

      {/* 🌌 Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/30 blur-[140px] rounded-full -top-40 -left-40 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-400/30 blur-[160px] rounded-full top-1/3 right-0 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-400/30 blur-[120px] rounded-full bottom-0 left-1/3 animate-pulse"></div>
      </div>

      {/* 🔐 Login Card */}
      <form
        onSubmit={handleSubmit}
        className="
          relative z-10 w-[380px]
          backdrop-blur-2xl bg-white/10
          border border-white/20
          rounded-2xl shadow-2xl
          p-8
        "
      >
        <h2 className="text-3xl font-bold text-center mb-2 
          bg-gradient-to-r from-emerald-300 to-blue-300 
          text-transparent bg-clip-text">
          Admin Login
        </h2>

        <p className="text-center text-gray-300 mb-8 text-sm">
          Secure access to admin dashboard
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-300 text-sm mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="admin@site.com"
            value={form.email}
            onChange={handleChange}
            className="
              w-full p-3 rounded-lg 
              bg-white/10 border border-white/20
              text-white placeholder-gray-400
              focus:ring-2 focus:ring-emerald-400
              outline-none
            "
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="
              w-full p-3 rounded-lg 
              bg-white/10 border border-white/20
              text-white placeholder-gray-400
              focus:ring-2 focus:ring-emerald-400
              outline-none
            "
            required
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="
            w-full py-3 rounded-lg
            bg-gradient-to-r from-emerald-400 to-blue-500
            text-black font-semibold
            shadow-xl hover:shadow-2xl
            hover:scale-[1.02] transition-all
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Authorized personnel only
        </p>
      </form>
    </div>
  );
}
