import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import { InputAdornment, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormProvider, { RHFTextField } from '@/components/hook-forms';
import useAuth from '@/hooks/useAuth';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required')
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
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { push } = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const method = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: true
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful }
  } = method;

  const onSubmit = async (data) => {
    try {
      const loginResponse = await axios.post('/auth/login', {
        email: `${data.email}`,
        password: `${data.password}`
      });
      if (loginResponse.status === 200) {
        await login(loginResponse);
        enqueueSnackbar(loginResponse.data.message, {
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
      <Container component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <FormProvider
            methods={method}
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginTop: 1 }}
          >
            <RHFTextField
              variant="filled"
              margin="normal"
              name="email"
              label="Email Address"
            />
            <RHFTextField
              margin="normal"
              variant="filled"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Icon
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Login
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
