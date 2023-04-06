import Head from 'next/head';
import React from 'react';
import { getToken } from '@/utils/cookieToken';
import axios from '@/utils/axios';
import MainLayout from '@/layouts/mainLayouts';
import CreatePost from '@/sections/dashboard/postblog/CreatePost';
import RoleBasedGuard from '@/guard/RoleBasedGuard';
import useAuth from '@/hooks/useAuth';

export const getServerSideProps = async ({ req, query }) => {
  const token = getToken(req);
  try {
    const res = await axios.get(`/blog/postdetail/${query?.id}`, {
      headers: {
        token
      }
    });
    return {
      props: { data: res?.data }
    };
  } catch (err) {
    return {
      props: {
        data: []
      }
    };
  }
};

export default function PostPage({ data }) {
  return (
    <MainLayout>
      <Head>
        <title>Edit Post</title>
      </Head>
      <RoleBasedGuard roles={['admin', 'author']} hasContent>
        <CreatePost editData={data} isEdit={true} />
      </RoleBasedGuard>
    </MainLayout>
  );
}
