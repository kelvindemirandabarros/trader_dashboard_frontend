'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

// Functions:
import { cn } from '@/lib/utils';

const ToastProvider = ToastPrimitives.Provider;

/**
 * Viewport onde meus toasts vão aparecer.
 * É fixado no topo em mobile e no canto inferior em desktop.
 */
const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 ' +
        'sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * Variantes de estilo para o Toast
 */
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between ' +
    'space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ' +
    'data-[swipe=cancel]:translate-x-0 ' +
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] ' +
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      variant: {
        // default: 'border bg-background text-foreground',
        default:
          'border-l-4 border-green-500 bg-background text-foreground shadow-sm',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

/**
 * Root do Toast — envolve Title, Description, Close e (opcional) Action
 */
const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * Botão de ação dentro do toast (ex: desfazer)
 */
const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border ' +
        'bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Botão de fechar (ícone X) — sem atributos inválidos
 */
const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 ' +
        'opacity-0 transition-opacity hover:text-foreground ' +
        'focus:opacity-100 group-hover:opacity-100',
      className
    )}
    {...props}
  >
    <X className='h-4 w-4' />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * Título (em negrito) do Toast
 */
const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Descrição (baixo do título) do Toast
 */
const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

/**
 * Props do Toast correspondem às props do componente Toast primitivo
 */
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

/**
 * Elemento de ação dentro do Toast (botão)
 */
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction
};
