'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, ShieldCheck } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';
import PasswordField from '@/components/auth/PasswordField';
import { useAuth } from '@/context/AuthContext';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);
    try {
      register(form);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <div className="px-6 pt-6">
        <Link
          href="/welcome"
          className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500 transition hover:bg-pink-200"
        >
          <ArrowLeft size={20} />
        </Link>

        <h1 className="text-[26px] font-bold text-slate-900">Register</h1>
        <p className="mt-1 text-sm text-slate-400">Join SafeHer and start walking with confidence</p>
      </div>

      <div className="mt-8 flex-1 px-6 pb-10">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm shadow-pink-50 md:border md:border-pink-50">
          <h2 className="mb-4 flex items-center gap-2 border-b border-dashed border-slate-200 pb-4 text-lg font-bold text-slate-900">
            <Search size={18} className="text-slate-400" />
            Your Information
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                id="fullName"
                required
                value={form.fullName}
                onChange={updateField('fullName')}
                placeholder="e.g. Sarah"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={updateField('email')}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={updateField('phone')}
                placeholder="e.g. +62 812 3456 7890"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <PasswordField
              id="password"
              label="Password"
              value={form.password}
              onChange={updateField('password')}
              required
            />

            <PasswordField
              id="confirmPassword"
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={updateField('confirmPassword')}
              required
            />
          </div>
        </form>

        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-pink-50 p-4">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-pink-400" />
          <p className="text-sm leading-relaxed text-slate-500">
            Your details stay private — visible only to you, never shared publicly
          </p>
        </div>

        <label className="mt-5 flex items-start gap-2 text-sm text-slate-500">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-pink-500 focus:ring-pink-300"
          />
          <span>
            I agree to SafeHer{' '}
            <Link href="#" className="font-medium text-pink-500 hover:text-pink-600">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="font-medium text-pink-500 hover:text-pink-600">
              Privacy Policy
            </Link>
          </span>
        </label>

        {error && <p className="mt-4 text-sm font-medium text-rose-500">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-pink-500 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting ? 'Creating Account…' : 'Create Account'}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-pink-500 hover:text-pink-600">
            Log In
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}