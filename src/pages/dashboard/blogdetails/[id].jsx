import BlogDetails from '@/sections/dashboard/blogdetails/BlogDetails';
import Head from 'next/head';
import React from 'react';
import { getToken } from '@/utils/cookieToken';
import axios from '@/utils/axios';
import MainLayout from '@/layouts/mainLayouts';

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

export default function BlogDetail({ data }) {
  return (
    <MainLayout>
      <Head>
        <title>Blog Detail</title>
      </Head>
      <BlogDetails data={data} />
    </MainLayout>
  );
}
