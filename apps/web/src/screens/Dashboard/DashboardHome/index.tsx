'use client';

import { SignCard } from '@/components/SignCard';
import { GetIssuesResponse } from '@/lib/requets/get-issues';
import { Flatted } from 'core/base/entity';
import { Reflector } from 'core/domains/reflector';
import { IWork, Work } from 'core/domains/work';
import { useRouter } from 'next/navigation';
import React from 'react';

export const DashboardHome = ({ issues }: { issues: GetIssuesResponse[] }) => {
  const router = useRouter();

  const cards = [];

  const maxNumOfCards = 10;

 const reformedIssues = issues.map((issue) => {
  const {id, ...props} = issue
  const reflector = new Reflector(issue.reflector.props, issue.reflector._id)

  const work = new Work({
    ...props,
    reflector
  }, id)

  return work
 })

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
        {reformedIssues.map((work) => {
          return (
            <SignCard
              key={work.id}
              picture={work.flatted.pictures[0]}
              status={work.flatted.status}
              sign_id={work.flatted.sign_id}
              author={work.flatted.author}
              cardId={work.id}
              local={work.flatted.reflector?.flatted.kilometer_position}
              onClick={() => router.push(`/dashboard/issue/${work.id}`)}
            />
          );
        })}
      </div>
    </>
  );
};
