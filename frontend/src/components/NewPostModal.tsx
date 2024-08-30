import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function NewPostModal({ open, onClose, onSubmit }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data.title, data.body, data.author);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="body"
            control={control}
            defaultValue=""
            rules={{ required: 'Body is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Body"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="author"
            control={control}
            defaultValue=""
            rules={{ required: 'Author is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Author"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default NewPostModal;
