'use client';

import React from 'react';

// Components:
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-background'>
        <Navbar />

        <main className='container mx-auto p-4 pt-8'>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
