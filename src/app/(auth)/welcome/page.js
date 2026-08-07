'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CloudMascot from '@/components/auth/CloudMascot';
import AuthShell from '@/components/auth/AuthShell';

const SLIDES = [
  {
    mascot: 'heart',
    title: 'Safe Journeys, Stronger Communities',
    subtitle: 'Plan routes, report safely, stay connected.',
  },
  {
    mascot: 'megaphone',
    title: 'Protect. Report. Connect.',
    subtitle: 'Stay anonymous. Keep others safe.',
  },
  {
    mascot: 'sparkle',
    title: 'Your Safety Is Our Mission',
    subtitle: 'Smart companion for safer journeys and stronger communities.',
  },
];

export default function WelcomePage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const isLastSlide = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  const handleNext = () => {
    if (isLastSlide) {
      router.push('/login');
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => router.push('/login');

  return (
    <AuthShell className="items-center justify-between px-8 py-16 text-center">
      <div className="w-full flex-1" />

      <div className="flex w-full flex-col items-center">
        <CloudMascot variant={slide.mascot} className="mb-10 h-[150px]" />

        <div className="mb-8 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-pink-500' : 'w-2 bg-pink-200'
              }`}
            />
          ))}
        </div>

        <h1 className="mb-3 max-w-xs text-2xl font-bold leading-tight text-slate-900">{slide.title}</h1>
        <p className="max-w-xs text-sm leading-relaxed text-slate-400">{slide.subtitle}</p>
      </div>

      <div className="w-full flex-1" />

      <div className="w-full space-y-4">
        <button
          onClick={handleNext}
          className="w-full rounded-full bg-pink-500 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 active:scale-[0.99]"
        >
          {isLastSlide ? 'Get Started' : 'Next'}
        </button>
        {!isLastSlide && (
          <button
            onClick={handleSkip}
            className="w-full text-sm font-medium text-pink-500 transition hover:text-pink-600"
          >
            Skip
          </button>
        )}
      </div>
    </AuthShell>
  );
}