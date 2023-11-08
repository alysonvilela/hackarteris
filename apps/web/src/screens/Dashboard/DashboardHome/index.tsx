'use client';

import { SignCard } from '@/components/SignCard';
import { Flatted } from '@/core/base/entity';
import { IWork } from '@/core/domains/work';
import { useRouter } from 'next/navigation';
import React from 'react';

export const DashboardHome = ({ issues }: { issues: Flatted<IWork>[] }) => {
  const router = useRouter();

  const cards = [];

  const maxNumOfCards = 10;

  for (let index = 0; index < maxNumOfCards; index++) {
    cards.push(index);
  }
  return (
    <>
      <div className="p-4">
        <h1 className="text-neutral-900 text-3xl font-bold">Chamados em aberto</h1>
        <h3 className="text-neutral-600">Lista de placas com defeitos.</h3>
      </div>
      <hr className="border-neutral-50" />
      <div className="flex flex-wrap gap-4 mt-8">
        {!issues.length && (
          <p className="text-3xl w-full text-center text-neutral-300 p-4">Não há nenhum chamado no momento!</p>
        )}
        {issues.map(({ id, sign_id, author, status, reflector, pictures }) => {
          const local = reflector?.flatted?.kilometer_position;
          return (
            <SignCard
              key={id}
              picture={pictures[0]}
              status={status}
              sign_id={sign_id}
              author={author}
              cardId={id}
              local={local}
              onClick={() => router.push(`/dashboard/issue/${id}`)}
            />
          );
        })}
      </div>
    </>
  );
};
