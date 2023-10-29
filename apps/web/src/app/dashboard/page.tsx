'use client';

import { SignCard } from '@/components/SignCard';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const cards = [];

  const maxNumOfCards = 10;

  for (let index = 0; index < maxNumOfCards; index++) {
    cards.push(index);
  }

  console;

  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((_, i) => {
        return <SignCard key={i} cardId={i} />;
      })}
    </div>
  );
}
