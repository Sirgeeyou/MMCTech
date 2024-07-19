import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="w-full flex">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
