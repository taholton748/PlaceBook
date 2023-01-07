import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Button,
  Card,
  Form,
  Icon,
  Placeholder,
  Rating
} from 'semantic-ui-react';
import { QUERY_CURRENT_USER } from '../graphql/queries';

// eslint-disable-next-line react/function-component-definition
const SinglePost = () => {
  const { id: PostId } = useParams();

  const extra = (
    <div>
      <Rating icon="star" defaultRating={0} maxRating={5} />
      <br />
      <br />
      <Button
        color="red"
        content="Like"
        icon="heart"
        label={{
          basic: true,
          color: 'red',
          pointing: 'left',
          content: '2,048 (post.likes)',
        }}
      />
      <Form reply>
        <Form.TextArea placeholder="What do you think?" />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="paper plane outline"
          primary
        />
      </Form>
    </div>
  );

  const { loading, data } = useQuery(QUERY_CURRENT_USER, {
    variables: { id: PostId },
  });

  // eslint-disable-next-line no-unused-vars
  const post = data?.post || {};

  if (loading) {
    return <Icon loading name="spinner" size="large" />;
  }
  return (
    <div>
      <Card
        image={Placeholder.Image}
        header="Test Post (post.title)"
        meta="created at (post.createdAt)"
        description="this is where the description will go (post.postBody)"
        extra={extra}
        className="flex fluid"
      />
    </div>
  );
};

export default SinglePost;
