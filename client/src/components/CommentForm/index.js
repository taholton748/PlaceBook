import React, { useState } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
// import { QUERY_POSTS, QUERY_USER } from '../../graphql/queries';
import { ADD_COMMENT } from '../../graphql/mutations';

// eslint-disable-next-line react/function-component-definition, arrow-body-style, no-unused-vars
const CommentForm = ({ postId }) => {
  const [commentBody, setComment] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
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
        variables: { commentBody, postId },
      });

      setComment('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
    console.log(commentBody);
  };

  return (
    <Comment.Group
      className={`${characterCount === 280 || error ? 'text-error' : ''}`}
    >
      <Comment
        style={{
          paddingLeft: '30%',
          paddingRight: '0%',
        }}
      >
        <Form
          reply
          onSubmit={handleFormSubmit}
        >
          <Form.TextArea
            placeholder="What do you think?"
            value={commentBody}
            onChange={handleChange}
          />
          <Button content="Add Comment" icon="paper plane" primary />
        </Form>
      </Comment>
    </Comment.Group>
  );
};

export default CommentForm;
