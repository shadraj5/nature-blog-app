import { Grid, Button } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from '@/utils/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { QuillForm } from '@/components/hook-forms';
import useAuth from '@/hooks/useAuth';

const Schema = yup.object().shape({
  comment: yup.string().required().min(10).max(8000)
});

export default function CommentForm() {
  const { query, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const method = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      id: query?.id,
      comment: ''
    }
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = method;

  const onsubmit = async (data) => {
    try {
      const result = await axios.post(`/blog/addcomment`, data);
      if (result.status === 200) {
        enqueueSnackbar(result?.data?.message, { variant: 'success' });
        push(`/dashboard/blogdetails/${query.id}`);
        reset();
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(onsubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <QuillForm name="comment" />
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            COMMENT
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
