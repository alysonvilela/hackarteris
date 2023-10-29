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
          <main className="p-2 container mx-auto">{children}</main>
          <CardDescription />
        </div>
      </body>
    </html>
  );
}
