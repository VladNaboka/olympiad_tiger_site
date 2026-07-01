'use client';

import { useState } from 'react';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { registerOlympiad } from '../../api/olympiad_api';

// Basic client-side format checks
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: optional + and 10–15 digits (spaces/brackets/dashes are stripped before checking)
const PHONE_RE = /^\+?\d{10,15}$/;

export default function OlympiadRegister() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    olympiad: 'Math',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError('');
  };

  const validate = () => {
    const next = {};
    const fullName = form.full_name.trim();
    const email = form.email.trim();
    const phone = form.phone.replace(/[\s()-]/g, '');

    if (!fullName) {
      next.full_name = 'Please enter your full name';
    } else if (fullName.length < 3) {
      next.full_name = 'Full name is too short';
    }

    if (!email) {
      next.email = 'Please enter your email';
    } else if (!EMAIL_RE.test(email)) {
      next.email = 'Invalid email format';
    }

    if (!phone) {
      next.phone = 'Please enter your phone number';
    } else if (!PHONE_RE.test(phone)) {
      next.phone = 'Invalid phone format (e.g. +77011234567)';
    }

    if (form.olympiad !== 'Math' && form.olympiad !== 'Art') {
      next.olympiad = 'Please choose an olympiad';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);
    try {
      const { redirect_url } = await registerOlympiad({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/[\s()-]/g, ''),
        olympiad: form.olympiad,
      });

      if (!redirect_url) {
        throw new Error('Payment link was not received. Please try again later.');
      }

      // Redirect to the FreedomPay payment page
      window.location.href = redirect_url;
    } catch (err) {
      setServerError(err.message || 'Failed to submit registration');
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-24 md:py-32 px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 text-center">
            Olympiad Registration
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Fill in the participant details. After payment, you will receive an
            email with your registration code (TIG-...).
          </p>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              {/* Full name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={handleChange('full_name')}
                  className={inputClass('full_name')}
                  placeholder="John Smith"
                  disabled={loading}
                />
                {errors.full_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={inputClass('email')}
                  placeholder="user@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className={inputClass('phone')}
                  placeholder="+77011234567"
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Olympiad */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Olympiad *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'Math', label: '📐 Math' },
                    { value: 'Art', label: '🎨 Art' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, olympiad: opt.value }))
                      }
                      disabled={loading}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                        form.olympiad === opt.value
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.olympiad && (
                  <p className="text-red-600 text-sm mt-1">{errors.olympiad}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Redirecting to payment...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Payment is processed on the secure FreedomPay page. We do not store
              or handle your card details.
            </p>
          </form>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
