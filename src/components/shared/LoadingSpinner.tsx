// src/components/shared/LoadingSpinner.tsx
'use client';

import { Loader2 } from 'lucide-react'; // Ícone de carregamento bonito e leve do Lucide

export function LoadingSpinner({
  message = 'Carregando...',
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      <p className="text-gray-700 text-sm">{message}</p>
    </div>
  );
}
