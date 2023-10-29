import { Sidebar } from '@/components/SideMenu';
import '@/styles/globals.css';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="max-w-xs w-full hidden md:block">
        <Sidebar />
      </aside>
      <main className="p-2 w-full">{children}</main>
    </div>
  );
}
