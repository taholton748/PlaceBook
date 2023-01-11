import React, { useState } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { QUERY_POSTS, QUERY_USER } from '../../graphql/queries';
import { ADD_COMMENT } from '../../graphql/mutations';
// eslint-disable-next-line react/function-component-definition, arrow-body-style
const CommentForm = () => {
  const [commentText, setComment] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // eslint-disable-next-line no-shadow, max-len
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    // eslint-disable-next-line no-shadow
    update(cache, { data: { addComment } }) {
      try {
        const { getUser } = cache.readQuery({ query: QUERY_USER });
        cache.writeQuery({
          query: QUERY_USER,
          data: {
            user: { ...getUser, comments: [...getUser.comments, addComment] },
          },
        });
      } catch (e) {
        console.warn('First comment by user!');
      }

      const { comments } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { comments: [addComment, ...comments] },
      });
    },
  });

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setComment(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentText },
      });

      setComment('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
    console.log('<<<<<HELLO>>>>>');
  };

  return (
    <Comment.Group
      className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
    >
      <Comment>
        <Form reply onSubmit={handleFormSubmit}>
          <Form.TextArea
            placeholder="What do you think?"
            value={commentText}
            onChange={handleChange}
          />
          <Button content="Add Comment" icon="paper plane" primary />
        </Form>
      </Comment>
    </Comment.Group>
  );
};

export default CommentForm;
