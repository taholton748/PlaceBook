import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Button,
  Card,
  Icon,
  Placeholder,
  Rating
} from 'semantic-ui-react';
import { QUERY_POST } from '../../graphql/queries';
import CommentForm from '../CommentForm';
// eslint-disable-next-line react/function-component-definition
const SinglePost = () => {
  const { id: PostId } = useParams();

  const [like, setLikes] = useState(0);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setLikes(JSON.parse(window.localStorage.getItem('like')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('like', like);
  }, [like]);

  const handleLikeClick = () => {
    setLikes(count => count + 1);
    setDisabled(true);
  };

  const extra = (
    <div>
      <Rating icon="star" defaultRating={0} maxRating={5} />
      <br />
      <br />
      <Button
        onClick={handleLikeClick}
        disabled={disabled}
        color="red"
        content="Like"
        icon="heart"
        label={{
          basic: true,
          color: 'red',
          pointing: 'left',
          content: `${like}`,
        }}
      />
    </div>
  );

  const { loading, data } = useQuery(QUERY_POST, {
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
        header={post.title}
        meta={post.createdAt}
        description={post.body}
        extra={[extra]}
        className="flex centered"
        style={{
          paddingLeft: '10%',
          paddingRight: '10%',
        }}
      />
      <CommentForm />
    </div>
  );
};

export default SinglePost;
