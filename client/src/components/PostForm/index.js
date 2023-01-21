/* eslint-disable */
import React, { useState } from 'react';

import { Modal, Form, Input, Rating, Image } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER, QUERY_POSTS } from '../../graphql/queries';
import { CREATE_POST } from '../../graphql/mutations';

const NewPostModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [postBody, setPostBody] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(1);
  // TODO: SWITCH THIS TO WORK WITH CLOUDINARY EVENTUALLY
  const [photos, setPhotos] = useState('photoPlaceholder')

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(cache, { data: createPost }) {

      try {
        const { getCurrentUser } = cache.readQuery({ query: QUERY_CURRENT_USER });
        console.log(getCurrentUser);
        cache.writeQuery({
          query: QUERY_CURRENT_USER,
          data: { getCurrentUser: { ...getCurrentUser, posts: [...getCurrentUser.posts, createPost] } }
        });
      } catch (e) {
        console.log(e);
        console.warn('First post insertion by user!');
      }

      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: { createPost, ...posts } }
      });
    }
  });

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setFile(file);
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPhotos(reader.result);
  //   }
  //   reader.readAsDataURL(file);
  // }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await createPost({
        variables: {
          location,
          postBody,
          photos,
          rating
        }
      });

      // clear form values
      setLocation('');
      setPostBody('');
      setRating(1)
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
      <Modal.Header>New post</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          {/* <Form.Field>
            {!isFileSelected ? <Input type='file' onChange={handleFileChange} /> : ''}            <Image src={photos} wrapped size='medium' />
          </Form.Field> */}
          <Form.Field>
            <Input
              placeholder="Add a description"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
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