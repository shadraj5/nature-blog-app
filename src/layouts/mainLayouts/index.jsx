import React from 'react';
import SearchAppBar from './Header';
import StickyFooter from './Footer';
import AuthGuard from '@/guard/AuthGuard';
import { Stack } from '@mui/material';

export default function MainLayout({ children }) {
  return (
    <AuthGuard>
      <SearchAppBar />
      {/* <Stack sx={{ mt: 5 }} /> */}
      {children}
      <StickyFooter />
    </AuthGuard>
  );
}
