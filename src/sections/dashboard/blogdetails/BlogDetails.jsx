import { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Stack,
  alpha
} from '@mui/material';
import { red } from '@mui/material/colors';
import moment from 'moment';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CommentForm from './CommentForm';
import { BASE_URI } from '@/utils/apiConfig';
import Pagination from '@mui/material/Pagination';
import Image from '@/components/Image';

function CommentList({ commentData, pageSize }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(commentData.length / pageSize);

  // Slice the data based on the current page and page size
  const currentData = commentData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handler for changing the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Grid item xs={12} md={12} mt={3}>
        <Typography variant="h5">Comments</Typography>
      </Grid>
      {currentData?.map((e, i) => {
        return (
          <Grid item xs={12} md={12} key={i}>
            <Card
              sx={{
                p: 1,
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.2)',
                transition: '0.3s',
                borderRadius: 4,
                borderColor: 'none'
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    // src={`http://localhost:3000/uploads/`}
                    alt={e.cName}
                  />
                }
                title={e.cName}
                subheader={moment(e.date).format('MMMM Do YYYY, h:mm:ss a')}
              />

              <Container sx={{ marginLeft: 6 }}>
                <Typography variant="caption">
                  <span dangerouslySetInnerHTML={{ __html: e.message }} />
                </Typography>
              </Container>
            </Card>
          </Grid>
        );
      })}
      <Grid item xs={12} md={12}>
        <Pagination
          count={totalPages}
          shape="rounded"
          onChange={(_, value) => handlePageChange(value)}
        />
      </Grid>
    </>
  );
}

export default function BlogDetails({ data }) {
  return (
    <>
      <Container sx={{ p: 5 }}>
        <Grid container spacing={2}>
          {/* Card Grid */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.2)',
                transition: '0.3s',
                borderRadius: 4,
                borderColor: 'none'
              }}
            >
              {/* <CardMedia
                sx={{ height: 400 }}
                image={`${BASE_URI}/uploads/${data?.postData?.filename}`}
                title="green iguana"
              /> */}
              <Image
                sx={{ height: 400 }}
                src={`${BASE_URI}/uploads/${data?.postData?.filename}`}
                alt="Paella dish"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">{data?.postData?.title}</Typography>
            <Stack sx={{ mt: 3 }} />
            <Typography variant="p">
              <span
                dangerouslySetInnerHTML={{ __html: data?.postData?.content }}
              />
            </Typography>
          </Grid>

          {data.postData?.comment?.length > 0 ? (
            <CommentList
              commentData={data?.postData?.comment.reverse()}
              pageSize={4}
            />
          ) : (
            <Grid item xs={12} md={12}>
              <Typography variant="caption" textAlign="center" color="primary">
                No Comments Found...
              </Typography>
            </Grid>
          )}
        </Grid>
        <Stack sx={{ mt: 3 }} />
        <CommentForm />
      </Container>
    </>
  );
}
