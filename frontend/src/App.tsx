import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { AppBar, Toolbar, Typography, Container, Button, CircularProgress, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import NewPostModal from './components/NewPostModal';
import PostCard from './components/PostCard';

const HeroSection = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.unsplash.com/photo-1639327380086-f13b8fef4211?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjUwNDA0Mzl8&ixlib=rb-4.0.3)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(8, 0, 6),
  marginBottom: theme.spacing(4),
}));

const FloatingActionButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleCreatePost = async (title, body, author) => {
    try {
      await backend.createPost(title, body, author);
      setModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Crypto Blog</Typography>
        </Toolbar>
      </AppBar>
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Crypto Blog
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Explore the latest in blockchain and cryptocurrency
          </Typography>
        </Container>
      </HeroSection>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <FloatingActionButton
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        startIcon={<AddIcon />}
      >
        New Post
      </FloatingActionButton>
      <NewPostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

export default App;
