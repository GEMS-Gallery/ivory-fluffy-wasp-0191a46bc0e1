import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PostCard = ({ post }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          By {post.author} | {new Date(Number(post.createdAt) / 1000000).toLocaleString()}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default PostCard;
