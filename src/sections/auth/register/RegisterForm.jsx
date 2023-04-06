import * as React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';

import FormProvider, {
  RHFSelectField,
  RHFTextField
} from '@/components/hook-forms';

const RegisterSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),

  role: yup.string().required('Role is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <span color="inherit">Blog App</span> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function RegisterForm() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const method = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      role: '',
      fullName: ''
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful }
  } = method;

  const onSubmit = async (data) => {
    try {
      const RegisterResponse = await axios.post('/auth/register', {
        fullName: data.fullName,
        email: `${data.email}`,
        password: `${data.password}`,
        role: data?.role
      });
      if (RegisterResponse.status === 200) {
        enqueueSnackbar(RegisterResponse?.data?.message || 'successfully', {
          variant: 'success'
        });
        push('/dashboard/home');
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err?.message || 'Something went wrong', {
        variant: 'error'
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create user
          </Typography>

          <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFTextField name="fullName" label="Full Name" />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name="email" label="Email" />
              </Grid>
              <Grid item xs={12}>
                <RHFSelectField name="role" Lable="Role">
                  <option value="">Role</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                  <option value="user">Reader</option>
                </RHFSelectField>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField name="password" label="Password" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name="confirmPassword" label="Confirm Password" />
              </Grid>
            </Grid>

            <LoadingButton
              sx={{ mt: 3 }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Create user
            </LoadingButton>
          </FormProvider>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
