import React, { useEffect, useState } from 'react';
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

  const [commentList, setCommentList] = useState([]);

  const onAddCommentClick = () => {
    setCommentList(commentList.concat(<Form reply key={commentList.length} />));
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
      <Form reply>
        <Form.TextArea placeholder="What do you think?" />
        <Button
          onClick={onAddCommentClick}
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
    <Card
      image={Placeholder.Image}
      header="Test Post (post.title)"
      meta="created at (post.createdAt)"
      description="this is where the description will go (post.postBody)"
      extra={[commentList, extra]}
      className="flex fluid"
      style={{
        paddingLeft: '10%',
        paddingRight: '10%',
      }}
    />
  );
};

export default SinglePost;
