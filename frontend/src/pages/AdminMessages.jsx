import { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../api/contact";
import { toast } from "react-toastify";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await getMessages();
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteMessage(deleteId);
      setMessages((prev) => prev.filter((m) => m._id !== deleteId));
      toast.success("Message deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading messages…
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 p-6">

      {/* 🌌 Background glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/20 blur-[140px] rounded-full -top-40 -left-40"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-400/20 blur-[160px] rounded-full top-1/3 right-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-400/20 blur-[120px] rounded-full bottom-0 left-1/3"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold 
            bg-gradient-to-r from-emerald-300 to-blue-300 
            text-transparent bg-clip-text">
            📩 Contact Messages
          </h2>

          <span className="text-sm text-gray-400">
            Total: {messages.length}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
          <table className="w-full border-collapse text-sm text-gray-200">
            <thead className="bg-white/10 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{msg.name}</td>
                  <td className="p-4">{msg.email}</td>
                  <td className="p-4">{msg.phone || "-"}</td>
                  <td className="p-4 max-w-sm">
                    <p className="line-clamp-2 text-gray-300">
                      {msg.message}
                    </p>
                  </td>
                  <td className="p-4 text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setDeleteId(msg._id)}
                      className="
                        px-3 py-1 rounded-lg
                        text-red-400 border border-red-400/30
                        hover:bg-red-500/10 hover:text-red-300
                        transition
                      "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {messages.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-10 text-center text-gray-400"
                  >
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔴 Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl animate-scale">
            <h3 className="text-xl font-semibold text-white mb-3">
              Confirm Delete
            </h3>
            <p className="text-gray-300 mb-6">
              This message will be permanently deleted.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-white/30 text-gray-200 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes scale {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale {
          animation: scale 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
