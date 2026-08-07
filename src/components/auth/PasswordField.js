'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordField({ id, label, value, onChange, placeholder = '', required = false }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-pink-500"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
    </div>
  );
}