/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { FileTextIcon } from '@radix-ui/react-icons';
import { SewingPinIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import useQueryParams from '@/hooks/useQueryParams';

interface SignCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: number;
}

export function SignCard({ className, cardId, ...props }: SignCardProps) {
  const { setQueryParams } = useQueryParams();

  return (
    <div className={cn('space-y-3 border-[1px] border-slate-100 ', className)} {...props}>
      <div className={'overflow-hidden rounded-md relative w-full h-auto max-w-xs max-h-60'}>
        <img
          src={'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80'}
          alt="dsadsa"
          className={cn('h-auto w-auto object-cover transition-all hover:scale-105 ')}
        />
      </div>

      <div className="space-y-1 text-md p-2 flex flex-col">
        <h3 className="font-medium leading-none mb-2">Placa</h3>
        <p className="text-xs text-muted-foreground mb-8 flex gap-2">
          <FileTextIcon />
          <span>Descrição</span>
        </p>
        <p className="text-xs text-muted-foreground mb-8 flex gap-2">
          <SewingPinIcon />
          <span>Local</span>
        </p>

        <Button
          onClick={() => setQueryParams({ selected_sign: cardId })}
          className="max-w-[156px] self-end"
        >
          Informações
        </Button>
      </div>
    </div>
  );
}
