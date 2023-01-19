/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
import { Feed, Icon } from 'semantic-ui-react';

export default function PostFeed({ posts }) {
  console.log(posts);
  if (!posts.length) {
    return <h3>Make some friends to see their posts!</h3>;
  }

  return (
    <div>
      <h3>Here is where your friends have been!</h3>
      {posts &&
        // eslint-disable-next-line react/destructuring-assignment
        posts.map(post => (
          <Feed>
            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/helen.jpg" />
              <Feed.Content>
                <Feed.Summary>
                  <Link
                    to={`/profile/${post.username}`}
                    style={{ fontWeight: 700 }}
                  >
                    {post.username}
                  </Link>
                  {' went to '}
                  <Link
                    to={`/post/${post._id}`}
                    style={{ fontWeight: 700 }}
                  >
                    {post.location}
                  </Link>
                  <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                  <a href="mailto:example@example.com">
                    <img src="https://react.semantic-ui.com/images/wireframe/image.png" alt="prop" />
                  </a>
                  <a href="mailto:example@example.com">
                    <img src="https://react.semantic-ui.com/images/wireframe/image.png" alt="prop" />
                  </a>
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />
                    {post.likeCount}
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        ))}
    </div>

  );
}
