import { Sidebar } from '@/components/SideMenu';
import { Button } from '@/components/ui/button';
import RoadLab from '../../../public/roadlab.svg';
import '@/styles/globals.css';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { Header } from '@/components/LayoutHeader';


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100">
      <Header />
      <main className="h-screen px-4 grid grid-cols-3 gap-4 mt-[-6rem]">
        <section className="col-span-3 lg:col-span-2 gap-4 w-full bg-white border-spacing-4 h-fit p-4 rounded-md">
          {children}
        </section>
        <div className="hidden lg:col-span-1 w-full bg-white border-spacing-4 h-fit p-4 rounded-md">
          Whatsapp desconectado
        </div>
      </main>
    </div>
  );
}
