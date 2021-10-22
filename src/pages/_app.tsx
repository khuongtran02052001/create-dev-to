/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';

import { AppProps } from 'next/app';

import {
  UserContext,
  NotificationProps,
  LikeProps,
  CmtProps,
  User,
} from 'src/Context/AuthContext';
import { apiUrl, LOCAL_STORAGE } from 'src/Context/contant';
import Layout from 'src/layout/Layout';

import '../styles/main.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import setAuthToken from '../utils/setAuthToken';

import axios from 'axios';
import { ThemeProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User>({
    username: '',
    avatar: '',
    _id: '',
    fullname: '',
  });
  const [notification, setNotification] = useState<NotificationProps>({
    receiver: '',
    message: '',
    postId: '',
  });
  const [likeContext, setLikeContext] = useState<LikeProps>({
    _id: '',
    authorId: '',
    postId: '',
  });
  const [cmtContext, setCmtContext] = useState<CmtProps>({ cmtAuthor: [] });
  const [queryClient] = React.useState(() => new QueryClient());

  // lay token lan` dau`
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE);
    if (token) {
      setAuthToken(token);
      axios.get(`${apiUrl}/auth`).then((res) => setUser(res.data.user));
    }
  }, []);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{
            user,
            setUser,
            notification,
            setNotification,
            likeContext,
            setLikeContext,
            cmtContext,
            setCmtContext,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
