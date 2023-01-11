/* eslint-disable */
import React, { useState } from 'react';
import { Modal, Form, Input, Rating, Image } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../../graphql/queries';
import { CREATE_POST } from '../../graphql/mutations';

const NewPostModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [photos, setPhotos] = useState('')
    const [file, setFile] = useState(null);
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [error, setError] = useState('')

    const { data: currentUserData } = useQuery(QUERY_CURRENT_USER);
    const currentUser = currentUserData ? currentUserData.getCurrentUser : null;

    const [createPost] = useMutation(CREATE_POST);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotos(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = async () => {
        if (!currentUser) {
            setError("Please login to create a post")
            return;
        }
        try {
            setError("")
            const formData = new FormData();
            formData.append("file", file);
            formData.append("location", location);
            formData.append("postBody", description);
            formData.append("rating", rating);
            //You may need to use your own server here to handle the file upload and return the link
            //or send it to the cloud service to get the image link
            //Then use that link to pass it to the createPost mutation.
            await createPost({
                variables: formData
              });
          setModalOpen(false);
          setDescription('');
          setLocation('');
          setRating(0);
          setFile(null);
          setPhotos('');
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
           {!isFileSelected ? <Input type='file' onChange={handleFileChange}/> : ''}            <Image src={photos} wrapped size='medium' />
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