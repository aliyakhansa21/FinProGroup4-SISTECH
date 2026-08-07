'use client';

import Image from 'next/image';

const MASCOTS = {
  heart: {
    src: '/images/mascot/cloud-heart.png',
    alt: 'Smiling cloud mascot with a heart',
  },
  megaphone: {
    src: '/images/mascot/cloud-megaphone.png',
    alt: 'Cloud mascot holding a megaphone',
  },
  sparkle: {
    src: '/images/mascot/cloud-sparkle.png',
    alt: 'Smiling cloud mascot surrounded by sparkles',
  },
};

/**
 * Illustrated cloud mascot with three expression variants:
 *  - 'heart'      → content smile with a heart (slide 1: "Safe Journeys...")
 *  - 'megaphone'  → alert/announcing face with a megaphone (slide 2: "Protect. Report. Connect.")
 *  - 'sparkle'    → cheerful smile with sparkles, no heart (slide 3: "Your Safety Is Our Mission")
 */
export default function CloudMascot({ variant = 'sparkle', className = '' }) {
  const mascot = MASCOTS[variant] ?? MASCOTS.sparkle;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src={mascot.src}
        alt={mascot.alt}
        width={220}
        height={220}
        priority
        className="h-auto w-[190px] object-contain"
      />
    </div>
  );
}