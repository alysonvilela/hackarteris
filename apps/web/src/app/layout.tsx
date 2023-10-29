import { CardDescription } from '@/components/CardDescription';
import { Sidebar } from '@/components/SideMenu';
import '@/styles/globals.css';

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="flex">
          <aside className="max-w-xs w-full">
            <Sidebar />
          </aside>
          <main className="p-2">{children}</main>
          <CardDescription />
        </div>
      </body>
    </html>
  );
}
