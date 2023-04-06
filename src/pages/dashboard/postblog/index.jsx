import React from 'react';
import Head from 'next/head';
import MainLayout from '@/layouts/mainLayouts';
import CreatePost from '@/sections/dashboard/postblog/CreatePost';
import RoleBasedGuard from '@/guard/RoleBasedGuard';
import useAuth from '@/hooks/useAuth';

export default function PostPage() {
  return (
    <MainLayout>
      <Head>
        <title>Create Post</title>
      </Head>
      <RoleBasedGuard roles={['admin', 'author']} hasContent>
        <CreatePost />
      </RoleBasedGuard>
    </MainLayout>
  );
}
