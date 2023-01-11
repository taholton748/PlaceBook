import React, { useState } from 'react';
import { Button, Modal, Form, Rating } from 'semantic-ui-react';
import UploadWidget from '../UploadWidget/index';

function CreatePostModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      trigger={<Button onClick={() => setOpen(true)}>Create New Post</Button>}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>Create New Post</Modal.Header>
      <Modal.Content>
        <Form>
        <Form.Field>
            <label>Photo</label>
            <UploadWidget />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea id="description" name="description" />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input id="location" name="location" />
          </Form.Field>
          <Form.Field>
            <label>Rating</label>
            <Rating icon="star" defaultRating={0} maxRating={5} id="rating" name="rating" />
          </Form.Field>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

function handleSubmit() {
  // Get the form data
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;
  const rating = document.getElementById('rating').value;

  // Create a new post object
  const createPost = new Post({
    username: 'JohnDoe', // replace with actual username
    description: description,
    location: location,
    rating: rating,
  });

  // Save the new post to the database
  createPost.save((error) => {
    if (error) {
      // handle error
    } else {
      // post saved successfully, close the modal
      setOpen(false);
      console.log('Post saved successfully!');
    }
  });
}

export default CreatePostModal;