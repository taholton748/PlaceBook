/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';

import PostFeed from '../components/Feed';
import PostForm from '../components/PostForm';

import { QUERY_POSTS, QUERY_CURRENT_USER } from '../graphql/queries';

import CurrentUserContextProvider from '../context/currentUser';

export default function Dashboard() {
  // use useQuery hook to make query request
  const { loading, error, data } = useQuery(QUERY_POSTS);
  // console.log('Error ---', JSON.stringify(error, null, 2));
  console.log('Data ---', data);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and
  // rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_CURRENT_USER);

  const posts = data?.getPosts || [];
  console.log('Posts ---', posts);

  return (
    <div>
      <PostForm />
      <h2>Dashboard</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PostFeed posts={posts} />
      )}
    </div>
  );
}
