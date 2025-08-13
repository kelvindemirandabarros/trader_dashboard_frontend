'use client';

import * as React from 'react';

// Components:
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast';

// Functions:
import { useToast } from '@/components/ui/use-toast';

/**
 * Componente Toaster — deve ficar em algum lugar alto na arvore (ex: app/layout.tsx)
 * para que apareça em qualquer página.
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toastConfig) => {
        const {
          id,
          title,
          description,
          action, // ReactElement<ToastAction>
          open,
          onOpenChange
        } = toastConfig;

        return (
          <Toast key={id} open={open} onOpenChange={onOpenChange}>
            {/* título e descrição */}
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>

            {/* em vez de recriar o ToastAction, renderize ele diretamente */}
            {action}

            {/* botão de fechar */}
            <ToastClose />
          </Toast>
        );
      })}

      <ToastViewport />
    </ToastProvider>
  );
}
