'use client';
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { PersonIcon, SewingPinIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useState } from 'react';

interface SignCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string;
  onClick: () => void;
  sign_id: string;
  author: string;
  status: 'LOW_REFLETANCE' | 'OK' | 'DAMAGE';
  local: string | undefined;
  picture: string;
}

export const statusParser = {
  LOW_REFLETANCE: 'Baixa refletância',
  DAMAGE: 'Danificada',
  OK: 'Normal',
};

export function SignCard({
  className,
  cardId,
  local,
  onClick,
  author,
  sign_id,
  status,
  picture,
  ...props
}: SignCardProps) {
  const statusParser = {
    LOW_REFLETANCE: 'Baixa Refletância',
    DAMAGE: 'Danificada',
    OK: 'Normal',
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const sendMessage = async () => {
    const { data } = await axios.get('http://localhost:3001/team/all', {
      headers: { 'x-api-key': '12345' },
    });
    console.log(data);
    const teamId = await data[0].id;
    await axios.post(
      `http://localhost:3001/issues/call/${cardId}/${teamId}`,
      {},
      {
        headers: { 'x-api-key': '12345' },
      }
    );
    setModalOpen(true);
  };

  const currentStatus = statusParser[status];

  return (
    <div
      className={cn('space-y-3 border-[1px] border-slate-50 min-w-[320px] rounded-lg ', className)}
      {...props}
    >
      <Dialog open={modalOpen}>
        <DialogContent className="w-5/6 rounded-md">
          <DialogHeader className="my-6 gap-4">
            <DialogTitle>Ocorrência enviada!</DialogTitle>
            <DialogDescription>
              Sua ocorrência foi enviada para o time responsável! ✅
            </DialogDescription>
            <Button onClick={() => setModalOpen(false)}>Continuar</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className={'overflow-hidden rounded-full relative w-fit  mt-4 m-auto  '}>
        <img
          src={picture}
          alt="dsadsa"
          className={cn('h-[120px] w-[120px] object-cover transition-all hover:scale-105 ')}
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
        <Badge className="min-w-fit" variant={status}>
          {currentStatus}
        </Badge>

        <div className="flex w-full border-t-[1px] border-slate-50 mt-8">
          <Button
            onClick={onClick}
            variant="ghost"
            className="w-full self-end rounded-none rounded-bl-md font-semibold"
          >
            Informações
          </Button>
          <Button
            onClick={sendMessage}
            variant="ghost"
            className="w-full self-end rounded-none rounded-br-md font-semibold"
          >
            Enviar chamado
          </Button>
        </div>
      </div>
    </div>
  );
}
