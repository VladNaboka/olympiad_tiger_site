'use client';

import { useEffect, useState } from 'react';
import { getAllFeedback, deleteFeedback } from '@/app/api/feedback_api';

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchData() {
    try {
      const data = await getAllFeedback();
      setFeedbackList(data);
    } catch (error) {
      console.error("Feedback upload error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (!confirm("❗ Are you sure you want to delete this message?")) return;
    try {
      setDeleting(true);
      await deleteFeedback(id);
      alert("✅ Message deleted");
      setSelectedFeedback(null);
      fetchData();
    } catch (error) {
      console.error("Error when deleting:", error);
      alert("❌ Couldn't delete message");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📬 Feedback from users</h1>

      {loading ? (
        <p>Loading...</p>
      ) : feedbackList.length === 0 ? (
        <p>No messages</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Subject</th>
                <th className="p-3 border-b">Sender</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((fb) => (
                <tr
                  key={fb.id}
                  className="hover:bg-orange-50 cursor-pointer"
                  onClick={() => setSelectedFeedback(fb)}
                >
                  <td className="p-3 border-b">{fb.subject || "No subject"}</td>
                  <td className="p-3 border-b">
                    {fb.name} <span className="text-gray-500">({fb.email})</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Модальное окно */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedFeedback(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">📩 Message</h2>
            <p><strong>Имя:</strong> {selectedFeedback.name}</p>
            <p><strong>Email:</strong> {selectedFeedback.email}</p>
            <p><strong>Тема:</strong> {selectedFeedback.subject || "Без темы"}</p>
            <p className="mt-4"><strong>Message:</strong></p>
            <p className="bg-gray-50 p-3 rounded">{selectedFeedback.message}</p>
            {selectedFeedback.created_at && (
              <p className="mt-4 text-gray-500 text-sm">
                Отправлено: {new Date(selectedFeedback.created_at).toLocaleString()}
              </p>
            )}

            {/* Кнопка удаления */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
                onClick={() => handleDelete(selectedFeedback.id)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
