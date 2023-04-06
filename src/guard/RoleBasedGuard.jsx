import { Container, Typography, Box } from '@mui/material';
import PermissionDenied from '@/components/PermissionDenied';
//
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export default function RoleBasedGuard({ hasContent, roles, children }) {
  // Logic here to get current user role
  const { user } = useAuth();

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (!roles.includes(currentRole)) {
    return hasContent ? <PermissionDenied /> : null;
  }

  return <>{children}</>;
}
