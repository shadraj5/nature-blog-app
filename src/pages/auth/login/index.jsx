import React from 'react';
import Head from 'next/head';
import { LoginForm } from '@/sections/auth/login';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm />
    </>
  );
}
