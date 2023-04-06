import React from 'react';
import { Stack, Box, Typography, Container } from '@mui/material';

export default function PermissionDenied() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Typography variant="h4" color="error">
          Permission Denied{' '}
        </Typography>
      </Box>
    </Container>
  );
}
