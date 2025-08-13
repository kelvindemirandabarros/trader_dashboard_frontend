'use client';

import React, { useEffect, useState } from 'react';

// Components:
import { ActivityIndicator } from '@/components/ActivityIndicator';

// Services:
import { get_home_response } from '@/services/home.service';

/**
 * Componente para monitorar status do servidor e notificar o usuário
 */
export function ServerStatusWatcher({
  children
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [is_server_online, set_is_server_online] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const home_response = await get_home_response();
        console.log('home_response status:', home_response.status);

        const is_online = home_response.status === 200;

        set_is_server_online(is_online);
      } catch (error: unknown) {
        console.log('Não foi possível checar status do servidor:');
        console.error(error);
        alert(
          'Não foi possível checar se o servidor está online. Por favor, atualize a página.'
        );
      }
    }

    check();
  }, []);

  if (!is_server_online) {
    return (
      <div className='flex flex-col h-screen items-center justify-center'>
        <p className='text-center text-red-500'>
          Servidor sendo iniciado. Isto pode demorar até, no máximo, 1 minuto.
        </p>

        <div className='mt-2'>
          <ActivityIndicator />
        </div>
      </div>
    );
  }

  return children;
}
