import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import Loading from '../components/Loading';
//
import Login from '../pages/auth/login';
import useAuth from '@/hooks/useAuth';

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
}
