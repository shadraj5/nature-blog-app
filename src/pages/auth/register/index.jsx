import RoleBasedGuard from '@/guard/RoleBasedGuard';
import MainLayout from '@/layouts/mainLayouts';
import RegisterForm from '@/sections/auth/register/RegisterForm';
import React from 'react';

export default function Register() {
  return (
    <div>
      <MainLayout>
        <RoleBasedGuard roles={['admin']} hasContent>
          <RegisterForm />
        </RoleBasedGuard>
      </MainLayout>
    </div>
  );
}
