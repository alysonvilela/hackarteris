/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { PersonIcon, SewingPinIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SignCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string;
  onClick: () => void;
  sign_id: string;
  author: string;
  status: 'LOW_REFLETANCE' | 'OK' | 'DAMAGE';
  local: string | undefined;
}

export function SignCard({
  className,
  cardId,
  local,
  onClick,
  author,
  sign_id,
  status,
  ...props
}: SignCardProps) {
  const statusParser = {
    LOW_REFLETANCE: 'Reflexo Baixo',
    DAMAGE: 'Danificada',
    OK: 'Normal',
  };

  const currentStatus = statusParser[status];

  return (
    <div
      className={cn('space-y-3 border-[1px] border-slate-100 min-w-[320px] rounded-lg ', className)}
      {...props}
    >
      <div
        className={
          'overflow-hidden rounded-full relative w-full max-w-[160px] max-h-[160px] mt-4 m-auto  '
        }
      >
        <img
          src={'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80'}
          alt="dsadsa"
          className={cn('h-auto w-auto object-cover transition-all hover:scale-105 ')}
        />
      </div>

      <div className="text-md  flex flex-col items-center">
        <h3 className=" leading-none mb-2 font-semibold">{sign_id}</h3>
        <p className="text-xs text-muted-foreground mb-2 flex gap-2 ">
          <PersonIcon />
          <span>{author}</span>
        </p>
        <p className="text-xs text-muted-foreground mb-2 flex gap-2">
          <SewingPinIcon />
          <span>{local}</span>
        </p>
        <Badge className=" min-w-fit" variant={status}>
          {currentStatus}
        </Badge>

        <Button
          onClick={onClick}
          variant="ghost"
          className="w-full self-end border-t-[1px] border-slate-100 rounded-none mt-8 font-semibold"
        >
          Informações
        </Button>
      </div>
    </div>
  );
}
