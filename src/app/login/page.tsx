'use client';

import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Components:
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, isLoading } = useAuth();
  const router = useRouter();
  const [show_password, set_show_password] = useState(false);

  useEffect(() => {
    if (user?.token) {
      router.push('/dashboard');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      console.error('Não foi possível fazer o login. Erro:', err);

      setError('Email ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className='flex h-screen w-full items-center justify-center bg-background'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Login</CardTitle>

          <CardDescription className='text-center'>
            Entre com suas credenciais para acessar o sistema
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            {error && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />

                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>

              <Input
                id='email'
                type='email'
                placeholder='admin@exemplo.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Senha</Label>

              <div className='relative'>
                <Input
                  id='password'
                  type={show_password ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='pr-10'
                />

                <button
                  type='button'
                  onClick={() => set_show_password(!show_password)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground'
                >
                  {show_password ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-4'>
            <Button
              className='w-full'
              type='submit'
              variant='default'
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>

            {/* <a
              href='/forgot-password'
              className='text-sm text-blue-600 hover:underline dark:text-blue-400'
            >
              Esqueci minha senha
            </a> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
