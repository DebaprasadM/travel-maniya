import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-white/40 backdrop-blur-xl shadow-md sticky top-0 z-50 overflow-hidden">
      
      {/* 🎨 Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-500/30 blur-[120px] rounded-full -top-40 -left-20 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-500/30 blur-[120px] rounded-full -top-20 right-0 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-emerald-400/30 blur-[120px] rounded-full -bottom-40 left-1/3 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold">Travel Maniya</div>

        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="/" className="hover:text-gray-700">Home</a>
          <a href="/tours" className="hover:text-gray-700">Tours</a>
          <a href="/blogs" className="hover:text-gray-700">Blogs</a>
          <a href="/Contact" className="hover:text-gray-700">Contact Us</a>
          <a href="/AboutUs" className="hover:text-gray-700">About Us</a>
          

          <a
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 transition text-white rounded"
            href="/book"
          >
            Book Now
          </a>
          <a
  href="/admin/messages"
  className="px-4 py-2 text-sm font-medium hover:text-emerald-600"
>
  Admin Messages
</a>

        </nav>

        <button
          className="md:hidden p-2 rounded bg-white/40 backdrop-blur border"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl shadow-md px-4 pb-4">
          <a href="/" className="block py-2 border-b">Home</a>
          <a href="/tours" className="block py-2 border-b">Tours</a>
          <a href="/blogs" className="block py-2 border-b">Blogs</a>
          <a href="/Contact" className="block py-2 border-b">Contact Us</a>
          <a href="/AboutUs" className="block py-2 border-b">About Us</a>
          <a href="/book" className="block py-2 text-emerald-600 font-semibold block py-2 border-b">
            Book Now
          </a>
              <a
              className="block py-2 border-b"
  href="/admin/messages"
 
>
  Admin Messages
</a>
        </div>
      )}
    </header>
  );
}
