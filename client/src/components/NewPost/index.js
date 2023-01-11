import React, { useState } from 'react';
import { Modal, Form, Input, Rating } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import UploadWidget from '../UploadWidget';
import { QUERY_CURRENT_USER } from '../../graphql/queries';
import { CREATE_POST } from '../../graphql/mutations';

const NewPostModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [photos, setPhotos] = useState('')
    const [error, setError] = useState('')

    const { data: currentUserData } = useQuery(QUERY_CURRENT_USER);
    const currentUser = currentUserData ? currentUserData.getCurrentUser : null;

    const [createPost] = useMutation(CREATE_POST);

    const handleSubmit = async () => {
        if (!currentUser) {
            setError("Please login to create a post")
            return;
        }
        try {
            setError("")
            await createPost({
                variables: {
                  location: location,
                  postBody: description,
                  photos: photos,
                  rating: rating
              }
          });
          setModalOpen(false);
          setDescription('');
          setLocation('');
          setRating(0);
          setPhotos('')
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
          {error && <p>{error}</p>}
</Form>
</Modal.Content>
</Modal>
);
};

export default NewPostModal;