/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import '../App.css';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../auth/auth';

import logo from '../components/Images/PlaceBook.png';
import Feed from '../components/Feed';

import { QUERY_CURRENT_USER, QUERY_USER } from '../graphql/queries';

// import { useCurrentUserContext } from '../context/currentUser';

export default function Profile() {
  const { email: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_CURRENT_USER, {
    variables: { email: userParam }
  });

  const user = data?.me || data?.user || {};

  // navigate to / if the current user's email is the param
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.email) {
    <h4>
      You need to be logged in to see this page! Use the navigation links above to sign up or log in!
    </h4>;
  }

  return (
    <div className="background">
      <div className="profile">
        <div className="card">
          <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
          <h1>{userParam ? `${user.firstName}'s` : 'Your'} profile.</h1>
          <p className="title">CEO & Founder, Example</p>
          <p>Harvard University</p>
        </div>
      </div>
      <div className="feed">
        <div className="card">
          <h1>feed</h1>
          <Feed />
        </div>
      </div>
      <div className="friends">
        <div className="card">
          <h1>Friends:</h1>
        </div>
        <div className="card">
          <img src={logo} alt="logo" style={{ width: '20%' }} className="App-logo-small" />
          <h1>John Doe</h1>
          <p className="title">CEO & Founder, Example</p>
          <p>Harvard University</p>
        </div>
        <div className="card">
          <img src={logo} alt="logo" style={{ width: '20%' }} className="App-logo-small" />
          <h1>Jane Doe</h1>
          <p className="title">CEO & Founder, Example</p>
          <p>Harvard University</p>
        </div>
      </div>
    </div>
  );
}
