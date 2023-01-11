import React, { useState } from 'react';
import { Modal, Form, Input, Rating } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import UploadWidget from '../UploadWidget';

import { CREATE_POST } from "../../graphql/mutations";

const NewPostModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);

  const [createPost, { data }] = useMutation(CREATE_POST);

  const handleSubmit = async () => {
    try {
      createPost({
          variables: {
              input: {
                  description: description,
                  location: location,
                  rating: rating
              }
          }
      });
      setModalOpen(false);
      // reset form values
      setDescription('');
      setLocation('');
      setRating(0);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      trigger={<button onClick={() => setModalOpen(true)}>New Post</button>}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Modal.Header>Create a new post</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <UploadWidget />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Add a location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Rating
              icon='star'
              defaultRating={rating}
              maxRating={5}
              onRate={(e, { rating }) => setRating(rating)}
            />
          </Form.Field>
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default NewPostModal;