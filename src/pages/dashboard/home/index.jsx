import React from 'react';
import Head from 'next/head';
import axios from '@/utils/axios';
import MainLayout from '@/layouts/mainLayouts';
import { BlogList, Hero } from '@/sections/dashboard/home';
import { getToken } from '@/utils/cookieToken';

export default function HomePage({ data }) {
  return (
    <MainLayout>
      <Head>
        <title>Home</title>
      </Head>
      <Hero />
      <BlogList propData={data} />
    </MainLayout>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const token = getToken(req);
  try {
    const page = Number(query.page) || 1;
    const res = await axios.get(
      `/blog/getallpost?page=${page}&limit=6${
        query?.q ? `&q=${query.q}` : null
      }`,
      {
        headers: {
          token
        }
      }
    );
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
