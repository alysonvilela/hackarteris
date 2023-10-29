'use client';

import { SignCard } from '@/components/SignCard';
import { useRouter } from 'next/navigation';
import React from 'react';

import type { IWork } from '../../../../../api/src/core/domains/work';
import type { Flatted } from '../../../../../api/src/core/base/entity';

export const DashboardHome = ({ issues }: { issues: Flatted<IWork>[] }) => {
  const router = useRouter();

  const cards = [];

  const maxNumOfCards = 10;

  for (let index = 0; index < maxNumOfCards; index++) {
    cards.push(index);
  }
  return (
    <div className="flex flex-wrap gap-4">
      {issues.map(({ id, sign_id, author, status, reflector }) => {
        const local = reflector?.props?.kilometer_position;
        return (
          <SignCard
            key={id}
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
  );
};
