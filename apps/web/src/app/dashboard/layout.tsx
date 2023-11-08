import { Sidebar } from '@/components/SideMenu';
import { Button } from '@/components/ui/button';
import RoadLab from '../../../public/roadlab.svg';
import '@/styles/globals.css';
import Image from 'next/image';
import { Logo } from '@/components/Logo';

const Header = () => {
  return (
    <header className="pb-24 px-4 bg-brand-bg text-indigo-50 text-xs">
      <div className="py-4">
        <div className="w-[80px]">
        <Logo className="fill-brand-accent w-full" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 border-brand-bgLight border-opacity-25 py-4 border-t-[1px]">
        <ul className="col-span-2 flex gap-4">
          <li>
            <Button className="bg-transparent hover:bg-brand-bgLight">Início</Button>
          </li>
          <li>
            <Button className="bg-transparent hover:bg-brand-bgLight">Histório</Button>
          </li>
          <li>
            <Button className="bg-transparent hover:bg-brand-bgLight">Notificações</Button>
          </li>
          <li>
            <Button className="bg-transparent hover:bg-brand-bgLight">Configurações</Button>
          </li>
        </ul>
        <div className="col-span-1 py-2 flex items-center text-indigo-50 text-opacity-70">
          Envios recentes
        </div>
      </div>
    </header>
  );
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100">
      <Header />
      <main className="h-screen px-4 grid grid-cols-3 gap-4 mt-[-6rem]">
        <section className="col-span-2 gap-4 w-full bg-white border-spacing-4 h-fit p-4 rounded-md">
          {children}
        </section>
        <div className="col-span-1 w-full bg-white border-spacing-4 h-fit p-4 rounded-md">
          Whatsapp desconectado
        </div>
      </main>
    </div>
  );
}
