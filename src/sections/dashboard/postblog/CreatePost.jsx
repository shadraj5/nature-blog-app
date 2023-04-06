import React from 'react';
import { Grid, Container, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import axios from '@/utils/axios';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField, QuillForm } from '@/components/hook-forms';
import useAuth from '@/hooks/useAuth';

const Schema = yup.object().shape({
  title: yup.string().required().min(3).max(100),
  content: yup.string().required().min(10).max(8000)
});

export default function CreatePost({ editData, isEdit }) {
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const method = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      title: editData?.postData?.title || '',
      content: editData?.postData?.content || '',
      file: null,
      userId: user._id
    }
  });

  const onsubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('title', data.title);
      formData.append('content', data.content);
      if (isEdit) {
        const result = await axios.put(
          `/blog/postblog/?id=${query.id}`,
          formData
        );
        if (result.status === 200) {
          enqueueSnackbar('Successfully post', { variant: 'success' });
          push('/dashboard/home');
        }
      } else {
        formData.append('userId', data.userId);
        const result = await axios.post(`/blog/postblog`, formData);
        if (result.status === 200) {
          enqueueSnackbar('Successfully post', { variant: 'success' });
          push('/dashboard/home');
        }
      }
    } catch (err) {
      enqueueSnackbar(err?.message || 'something went wrong', {
        variant: 'error'
      });
    }
  };
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = method;
  const HandleUpload = (e) => {
    setValue('file', e.target.files[0]);
  };
  return (
    <div>
      <Container sx={{ p: 5, height: 600 }}>
        <FormProvider methods={method} onSubmit={handleSubmit(onsubmit)}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <RHFTextField name="title" label="Title" />
            </Grid>
            <Grid item md={12}>
              <QuillForm name="content" />
              {/* <RHFTextField multiline rows={4} name="content" label="Content" /> */}
            </Grid>
            <Grid item md={12} mt={5}>
              <input type="file" onChange={HandleUpload} />
            </Grid>
            <Grid item md={12}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {isEdit ? 'UPDATE POST' : 'POST'}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </div>
  );
}
