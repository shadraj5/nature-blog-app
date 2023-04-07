import React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';
import BlogCard from '@/components/BlogCard';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Icon } from '@iconify/react';

export default function BlogList({ propData }) {
  const [search, setSearch] = React.useState('');
  const { push } = useRouter();
  return (
    <Container sx={{ p: 5 }} maxWidth="lg">
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <TextField
              sx={{ width: '40%' }}
              variant="outlined"
              label="Search for title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        push(`/dashboard/home/?q=${search}`);
                        setSearch('');
                      }}
                      edge="end"
                    >
                      <Icon
                        fontSize={20}
                        icon={'material-symbols:arrow-right-alt-rounded'}
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {propData?.docs?.map((e) => {
          return (
            <Grid item xs={12} md={4} key={e._id}>
              <BlogCard data={e} />
            </Grid>
          );
        })}
      </Grid>
      <Stack spacing={2} mt={5}>
        <Pagination
          count={propData?.totalPages}
          shape="rounded"
          onChange={(_, value) => push(`/dashboard/home/?page=${value}`)}
        />
      </Stack>
    </Container>
  );
}
