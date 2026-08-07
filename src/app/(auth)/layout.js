import '@/app/globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'SafeHer — Women Safety Platform',
  description: 'Smart companion for safer journeys and stronger communities.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-pink-50 antialiased text-slate-800">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}