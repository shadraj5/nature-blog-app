import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Image from '@/components/Image';
import useAuth from '@/hooks/useAuth';
import { BASE_URI } from '@/utils/apiConfig';
import axios from '@/utils/axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function RecipeReviewCard({ data }) {
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = React.useState(false);
  const { push } = useRouter();
  const { user } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async (id) => {
    // alert delete confirmation
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await axios.delete(`/blog/postblog/?id=${id}}`);
        if (res.status === 200) {
          enqueueSnackbar('You have successfully deleted this post.', {
            variant: 'success'
          });
          push('/dashboard/home');
        }
      } catch (err) {
        enqueueSnackbar(err?.message || 'Something went wrong', {
          variant: 'error'
        });
      }
    }
    handleCloseUserMenu();
  };

  const words = data?.content.split(' ');
  const shortenedContent = words.slice(0, 30).join(' ') + '...';

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.2)',
        transition: '0.3s',
        borderRadius: 3
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={`${BASE_URI}/uploads/${data?.pblog[0].photoUrl}`}
            alt={data?.pblog[0].fullName}
          />
        }
        action={
          <Box sx={{ flexGrow: 0 }}>
            <Chip
              label={data?.pblog[0].role === 'admin' ? 'Admin' : 'Author'}
              size="small"
              color="success"
              variant="outlined"
            />
          </Box>
        }
        title={data?.pblog[0].fullName}
        subheader={moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
      />
      {/* <CardMedia
        component={Image}
        style={{ height: 194 }}
        src={`${BASE_URI}/uploads/${data?.filename}`}
        alt="Paella dish"
      /> */}
      <Image
        // component={Image}
        sx={{ height: 194 }}
        src={`${BASE_URI}/uploads/${data?.filename}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span dangerouslySetInnerHTML={{ __html: shortenedContent }} />
          <Typography
            component={Link}
            href={`/dashboard/blogdetails/${data?._id}`}
            variant="caption"
            color="primary"
          >
            Read more
          </Typography>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user?.role === 'admin' ||
        (data?.pblog[0].role === 'author' &&
          user?.role === 'author' &&
          user?.email === data?.pblog[0].email) ? (
          <>
            <Link href={`/dashboard/editblog/${data?._id}`}>
              <IconButton aria-label="add to favorites" color="primary">
                <Edit color="primary" />
              </IconButton>
            </Link>
            <IconButton
              aria-label="share"
              color="error"
              onClick={() => handleDelete(data?._id)}
            >
              <Delete color="error" />
            </IconButton>
          </>
        ) : null}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Post:</Typography>

          <Typography variant="caption">
            <span dangerouslySetInnerHTML={{ __html: data?.content }} />
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
