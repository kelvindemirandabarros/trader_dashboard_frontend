import * as React from 'react';
import Link from 'next/link';

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavbarLink({ href, children }: NavbarLinkProps) {
  return (
    <Link
      href={href}
      className='flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors'
    >
      {children}
    </Link>
  );
}
