import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f2f3f4 ]">{children}</body>
    </html>
  );
}
