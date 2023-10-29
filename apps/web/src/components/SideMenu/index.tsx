'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const signsWithIssues = [
  {
    id: '32189321',
    text: 'PLACA-23212',
  },
  {
    id: '21321321',
    text: 'PLACA-23212',
  },
  {
    id: '4539043901',
    text: 'PLACA-23212',
  },
];

const menuList = [
  {
    text: 'Botão',
    directory: '/dashboard',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    text: 'Botão2',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    text: 'Botão3',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
];

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();

  return (
    <div className={cn('pb-12 border-r-[1px] border-gray-100', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
          <div className="space-y-1">
            {menuList.map((node) => {
              return (
                <Link key={node.text} href={node.directory ?? '/'}>
                  <Button variant="ghost" className="w-full justify-start">
                    {node.icon}
                    {node.text}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Placas com problemas</h2>
          <div className="space-y-1">
            {signsWithIssues.map((sign) => {
              return (
                <Button key={sign.id} variant="ghost" className="w-full justify-start">
                  {sign.text}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">Histórico</h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2"></div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
