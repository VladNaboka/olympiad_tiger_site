'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Mail } from 'lucide-react';
import { getOlympiadRegistrations, getOlympiadSummary } from '../../api/olympiad_api';

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
  const [summary, setSummary] = useState({ paid_count: 0, totals: [] });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

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

  const loadSummary = async () => {
    try {
      setSummary(await getOlympiadSummary());
    } catch (err) {
      console.error('Error loading olympiad summary:', err);
    }
  };

  useEffect(() => {
    setPage(1);
    loadRegistrations(status);
  }, [status]);

  useEffect(() => {
    loadSummary();
  }, []);

  const paidCount = registrations.filter((r) => r.status === 'paid').length;

  const totalPages = Math.max(1, Math.ceil(registrations.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = registrations.slice(startIndex, startIndex + pageSize);

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
          onClick={() => {
            loadRegistrations(status);
            loadSummary();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Paid totals */}
      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6 text-sm text-green-900">
        <span className="font-semibold">Paid: {summary.paid_count}</span>
        {summary.totals.map((t) => (
          <span key={t.currency} className="ml-4">
            Total received: <span className="font-semibold">{t.total} {t.currency}</span> ({t.count})
          </span>
        ))}
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
        <>
        <div className="overflow-auto max-h-[70vh] border border-gray-200 rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Olympiad</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pageItems.map((reg) => {
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
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {reg.amount ? `${reg.amount} ${reg.currency || ''}`.trim() : '—'}
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

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-sm text-gray-700">
          <div>
            {startIndex + 1}–{Math.min(startIndex + pageSize, registrations.length)} of {registrations.length}
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              Per page
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                {[10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <button
              onClick={() => setPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              «
            </button>
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹ Prev
            </button>
            <span className="px-2">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              »
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
