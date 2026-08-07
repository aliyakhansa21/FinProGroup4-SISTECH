'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';
import PasswordField from '@/components/auth/PasswordField';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      login(email, password);
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

        <h1 className="text-[26px] font-bold text-slate-900">Welcome Back!</h1>
        <p className="mt-1 text-sm text-slate-400">Log in to continue your safe journey</p>
      </div>

      <div className="mt-8 flex-1 px-6">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm shadow-pink-50 md:border md:border-pink-50">
          <h2 className="mb-4 border-b border-dashed border-slate-200 pb-4 text-lg font-bold text-slate-900">
            Account
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-slate-500">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-pink-500 focus:ring-pink-300"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-pink-500 hover:text-pink-600">
                Forgot Password?
              </Link>
            </div>
          </div>

          {error && <p className="mt-4 text-sm font-medium text-rose-500">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 w-full rounded-full bg-pink-500 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 active:scale-[0.99] disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">or continue with</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <AppleIcon />
            Apple
          </button>
        </div>
      </div>

      <div className="px-6 pb-10 pt-6 text-center">
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-pink-500 hover:text-pink-600">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.95 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.17.27-1.7V4.97H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.03l3-2.33z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.06 9.53c-.02-2.02 1.65-2.99 1.73-3.04-.94-1.38-2.41-1.57-2.93-1.59-1.25-.13-2.44.73-3.07.73-.63 0-1.6-.72-2.64-.7-1.36.02-2.62.79-3.32 2-1.42 2.46-.36 6.1 1.02 8.1.67.98 1.48 2.08 2.53 2.04 1.02-.04 1.4-.66 2.63-.66 1.22 0 1.57.66 2.64.63 1.09-.02 1.78-1 2.44-1.99a8.4 8.4 0 001.1-2.25 3.63 3.63 0 01-2.13-3.27z" />
      <path d="M11.1 3.4c.56-.68.94-1.62.83-2.56-.8.03-1.78.53-2.36 1.2-.52.6-.98 1.56-.86 2.48.9.07 1.82-.46 2.39-1.12z" />
    </svg>
  );
}