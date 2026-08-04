import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: "Women Safety Platform",
  description: "SISTECH 2026 Final Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased text-gray-800 bg-gray-50">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}