'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound(): React.ReactNode {
  const pathname = usePathname();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-4xl font-bold mb-4'>404 - Página não encontrada</h1>

      <p className='text-gray-500 mb-2'>
        A URL <span className='font-mono text-red-600'>{pathname}</span> não
        existe.
      </p>

      <p className='text-gray-500 mb-6'>
        Verifique se o endereço foi digitado corretamente.
      </p>

      <Link href='/login' className='text-blue-600 hover:underline text-sm'>
        Voltar para a página inicial
      </Link>
    </div>
  );
}
