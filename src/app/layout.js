import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "Women Safety Platform",
  description: "SISTECH 2026 Final Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}