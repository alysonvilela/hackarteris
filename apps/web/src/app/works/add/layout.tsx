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
        </div>
      </body>
    </html>
  );
}
