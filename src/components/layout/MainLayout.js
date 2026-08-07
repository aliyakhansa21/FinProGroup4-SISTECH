import Header from "./Header";
import MobileNav from "./MobileNav";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fffbfb] relative pb-20 md:pb-0">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-[#fffbfb]">
        <Header />

        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
}