'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Mail } from 'lucide-react';
import { getOlympiadRegistrations } from '../../api/olympiad_api';

// Human-readable statuses for registrations
const STATUS_META = {
  pending: { label: '⏳ Pending', className: 'bg-yellow-100 text-yellow-800' },
  paid: { label: '✅ Paid', className: 'bg-green-100 text-green-800' },
  failed: { label: '❌ Failed', className: 'bg-red-100 text-red-800' },
};

const FILTERS = [
  { value: '', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

function formatDateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleString('en-GB');
}

export default function OlympiadTab() {
  const [registrations, setRegistrations] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRegistrations = async (statusFilter) => {
    setLoading(true);
    setError('');
    try {
      const data = await getOlympiadRegistrations(statusFilter);
      // Newest first
      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setRegistrations(sorted);
    } catch (err) {
      console.error('Error loading olympiad registrations:', err);
      setError('Failed to load registrations');
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations(status);
  }, [status]);

  const paidCount = registrations.filter((r) => r.status === 'paid').length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            🏆 Olympiad Registrations
          </h2>
          <p className="text-gray-600 text-sm">
            Total: {registrations.length}
            {status === '' && ` · paid: ${paidCount}`}
          </p>
        </div>
        <button
          onClick={() => loadRegistrations(status)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatus(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              status === f.value
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : registrations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📭</div>
          <p>No registrations yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Olympiad</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.map((reg) => {
                const meta = STATUS_META[reg.status] || {
                  label: reg.status,
                  className: 'bg-gray-100 text-gray-800',
                };
                return (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {reg.full_name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <a
                        href={`mailto:${reg.email}`}
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <Mail size={14} />
                        {reg.email}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <a href={`tel:${reg.phone}`} className="hover:underline">
                        {reg.phone}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {reg.olympiad}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meta.className}`}
                      >
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-gray-900">
                      {reg.registration_code || '—'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {formatDateTime(reg.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
