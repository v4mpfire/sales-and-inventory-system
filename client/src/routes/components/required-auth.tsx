import { Outlet, Navigate, useLocation } from 'react-router';

import { Typography } from '@mui/material';

import { useAccount } from 'src/utils/hooks/useAccount';

export default function RequiredAuth() {
  const { userSession, loadingUserSession } = useAccount();
  const location = useLocation();

  if (loadingUserSession) return <Typography>Loading...</Typography>;

  if (!userSession) return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
}
