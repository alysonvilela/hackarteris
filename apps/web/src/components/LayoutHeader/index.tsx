import { Logo } from "../Logo";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="pb-24 px-4 bg-brand-bg text-indigo-50 text-xs">
      <div className="py-4">
        <div className="w-[80px] h-fit">
        <Logo className="fill-brand-accent w-full" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 border-brand-bgLight border-opacity-25 py-4 border-t-[1px]">
        <ul className="col-span-3 lg:col-span-2 flex gap-4">
          <li>
            <Button className="bg-transparent hover:bg-brand-bgLight">Início</Button>
          </li>
          <li className="hidden lg:flex">
            <Button className="bg-transparent hover:bg-brand-bgLight">Histórico</Button>
          </li>
          <li className="hidden lg:flex">
            <Button className="bg-transparent hover:bg-brand-bgLight">Notificações</Button>
          </li>
          <li className="hidden lg:flex">
            <Button className="bg-transparent hover:bg-brand-bgLight">Configurações</Button>
          </li>
        </ul>
        <div className="hidden lg:col-span-1 py-2 lg:flex items-center text-indigo-50 text-opacity-70">
          Envios recentes
        </div>
      </div>
    </header>
  );
};