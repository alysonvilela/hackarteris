'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardDescription = ({ className }: CardDescriptionProps) => {
  const params = useSearchParams();

  const selectedCard = params.get('selected_sign');

  return (
    <div
      className={cn(
        ' w-full border-2 border-red-600',
        `${!selectedCard ? 'hidden' : 'block'}`,
        className,
      )}
    >
      Eu sou o card {selectedCard}
    </div>
  );
};
