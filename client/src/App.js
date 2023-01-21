import React, { useMemo } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { CurrentUserContextProvider } from './context';

import Navigation from './components/Navigation';
import SinglePost from './pages/SinglePost';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import './App.css';

// import ButtonExampleButton from './Btn';

function App() {
  const [cookies] = useCookies();

  const httpLink = useMemo(() => createHttpLink({ uri: '/graphql' }));

  const authLink = useMemo(() => setContext((_, { headers }) => {
    const token = cookies.auth_token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <CurrentUserContextProvider>
          <Navigation />
          {/* <ButtonExampleButton />
            <button type="button" className="ui button">Btn with Semantic-UI</button> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile">
              <Route path=":username" element={<Profile />} />
              <Route path="" element={<Profile />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </CurrentUserContextProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
