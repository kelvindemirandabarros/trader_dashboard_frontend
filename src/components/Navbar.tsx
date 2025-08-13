import {
  LayoutDashboard,
  LogOut,
  LucideBadgeInfo,
  MoonIcon,
  SunIcon
} from 'lucide-react';
import { useTheme } from 'next-themes';

// Components:
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NavbarLink } from '@/components/Navbar/NavbarLink';

// Consts:
import { app_name } from '@/consts/App';

export function Navbar() {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <nav className='border-b border-border bg-background'>
      {/* Container principal */}
      <div className='flex flex-col md:flex-col w-full gap-2 px-4 py-3'>
        {/* Linha 1: Nome do app + tema + logout */}
        <div className='flex justify-between items-center w-full flex-wrap gap-2'>
          {/* Nome do app */}
          <h1 className='text-lg font-semibold'>{app_name}</h1>

          {/* Tema + Logout */}
          <div className='flex gap-2 items-center'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='rounded-md border border-border'
            >
              {theme === 'dark' ? (
                <SunIcon className='h-5 w-5' />
              ) : (
                <MoonIcon className='h-5 w-5' />
              )}
            </Button>

            <Button
              variant='ghost'
              className='flex items-center rounded-md border border-border'
              onClick={logout}
            >
              <LogOut className='mr-2 h-4 w-4' />
              Sair
            </Button>
          </div>
        </div>

        {/* Linha 2: Links de navegação */}
        <div className='flex flex-wrap gap-2 md:gap-4'>
          <NavbarLink href='/dashboard'>
            <LayoutDashboard className='h-4 w-4' />
            <span>Dashboard</span>
          </NavbarLink>

          {/* <NavbarLink href='/information'>
            <LucideBadgeInfo className='h-4 w-4' />
            <span>Informações</span>
          </NavbarLink> */}
        </div>
      </div>
    </nav>
  );
}
