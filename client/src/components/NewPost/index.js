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
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label>Photo</label>
            <UploadWidget />
          </Form.Field>
          <Form.Field>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" />
          </Form.Field>
          <Form.Field>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label>Location</label>
            <input id="location" name="location" />
          </Form.Field>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Form.Field>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label>Rating</label>
            <Rating icon="star" defaultRating={0} maxRating={5} />
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

function handleSubmit() {
  // Get the form data
  const description = document.getElementById('description').value;
  const photo = document.getElementById('photo').files[0];
  const location = document.getElementById('location').value;

  // Create a new post object
  const newPost = new Post({
    username: 'JohnDoe', // replace with actual username
    description: { description },
    location: { location },
  });

  // Save the new post to the database
  newPost.save((error) => {
    if (error) {
      // handle error
    } else {
      // post saved successfully, close the modal
      setOpen(false);
    }
  });
}

export default CreatePostModal;
