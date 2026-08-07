'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MailCheck } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock network delay so the flow feels real
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 700);
  };

  return (
    <AuthShell>
      <div className="px-6 pt-6">
        <Link
          href="/login"
          className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500 transition hover:bg-pink-200"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Forgot Password?</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
            Enter the email linked to your account and we&apos;ll send you reset instructions
          </p>
        </div>
      </div>

      <div className="mt-8 px-6">
        {sent ? (
          <div className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm shadow-pink-50 md:border md:border-pink-50">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-500">
              <MailCheck size={26} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Check your inbox</h2>
            <p className="mt-2 text-sm text-slate-400">
              We sent reset instructions to <span className="font-medium text-slate-600">{email}</span>
            </p>
            <Link
              href="/login"
              className="mt-6 w-full rounded-full bg-pink-500 py-4 text-center text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
            >
              Back to Log In
            </Link>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-6 shadow-sm shadow-pink-50 md:border md:border-pink-50"
            >
              <h2 className="mb-4 border-b border-dashed border-slate-200 pb-4 text-base font-bold text-slate-900">
                Password Recovery
              </h2>

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

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-full bg-pink-500 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 active:scale-[0.99] disabled:opacity-60"
              >
                {isSubmitting ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              Remember your password?{' '}
              <Link href="/login" className="font-semibold text-pink-500 hover:text-pink-600">
                Log In
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthShell>
  );
}