/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
import '../App.css';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Auth from '../auth/auth';
import logo from '../components/Images/PlaceBook.png';
import Feed from '../components/Feed';
import FriendList from '../components/FriendList';

import { QUERY_CURRENT_USER, QUERY_USER } from '../graphql/queries';

// import { useCurrentUserContext } from '../context/currentUser';

const Profile = () => {
  const { username: userParam } = useParams();
  console.log(userParam);

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_CURRENT_USER, {
    variables: { username: userParam }
  });
  console.log('Error ---', JSON.stringify(error, null, 2));
  console.log('data ---', data);

  const user = data?.getCurrentUser || data?.getUser || {};
  // navigate to / if the current user's email is the param
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    <h4>
      You need to be logged in to see this page! Use the navigation links above to sign up or log in!
    </h4>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row className="card">
            <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
            <h1>{user.username}</h1>
            <p className="title">CEO , Founder, Example</p>
            <p>Harvard University</p>
          </Row>
          <FriendList />
        </Col>
        <Col className="card"><Feed /></Col>
      </Row>
    </Container>
  );
};

export default Profile;
