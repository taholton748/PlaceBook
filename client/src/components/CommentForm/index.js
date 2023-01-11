import React, { useState } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
// import { QUERY_POSTS, QUERY_USER } from '../../graphql/queries';
import { ADD_COMMENT } from '../../graphql/mutations';
// eslint-disable-next-line react/function-component-definition, arrow-body-style, no-unused-vars
const CommentForm = ({ postId }) => {
  const [commentText, setComment] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // eslint-disable-next-line no-shadow, max-len
  const [addComment, { error }] = useMutation(ADD_COMMENT);

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
        variables: { commentText, postId },
      });

      setComment('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
    console.log(commentText);
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
