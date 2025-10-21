'use client';

import { useState, useEffect } from 'react';
import { getAllFeedback, deleteFeedback } from '@/app/api/feedback_api';
import { Trash2, Mail, User, Calendar, MessageSquare } from 'lucide-react';

export default function FeedbackTab() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await getAllFeedback();
      // Сортируем по дате, новые сначала
      const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setFeedbacks(sorted);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      alert('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await deleteFeedback(id);
      alert('✅ Feedback deleted successfully');
      loadFeedbacks();
      setSelectedFeedback(null);
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('❌ Failed to delete feedback');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl">Loading feedbacks...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📬 Contact Form Submissions</h2>
        <p className="text-gray-600">Total submissions: {feedbacks.length}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Список заявок */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">All Submissions</h3>

          {feedbacks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No submissions yet
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  onClick={() => setSelectedFeedback(feedback)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedFeedback?.id === feedback.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{feedback.name}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{feedback.email}</p>
                  {feedback.subject && (
                    <p className="text-sm font-medium text-gray-700">
                      Subject: {feedback.subject}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {feedback.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Детали выбранной заявки */}
        <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
          {selectedFeedback ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold">Submission Details</h3>
                <button
                  onClick={() => handleDelete(selectedFeedback.id)}
                  className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="text-orange-500 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="font-semibold text-gray-800">{selectedFeedback.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-orange-500 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${selectedFeedback.email}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {selectedFeedback.email}
                    </a>
                  </div>
                </div>

                {selectedFeedback.subject && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="text-orange-500 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Subject</p>
                      <p className="font-semibold text-gray-800">{selectedFeedback.subject}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Calendar className="text-orange-500 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(selectedFeedback.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Message</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedFeedback.message}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={`mailto:${selectedFeedback.email}?subject=Re: ${selectedFeedback.subject || 'Your message'}`}
                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block text-center"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
