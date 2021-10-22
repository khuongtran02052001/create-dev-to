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

import load from '../animation/loading.module.css';
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
  const [loading, setLoading] = React.useState<boolean>(false);

  // lay token lan` dau`
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE);
    if (token) {
      setAuthToken(token);
      axios.get(`${apiUrl}/auth`).then((res) => setUser(res.data.user));
    }
  }, []);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {loading ? (
        <>
          <div className={load.animated}></div>
          <img
            className="m-auto"
            src="https://c.tenor.com/IH0XgR08ghoAAAAC/anime-loading.gif"
          />
          {/* <img className='m-auto' src='https://cdn.fbsbx.com/v/t59.2708-21/242999480_402646778102857_8136828040884460762_n.gif?_nc_cat=108&ccb=1-5&_nc_sid=041f46&_nc_ohc=cjHUWaVY9gkAX8_USOl&_nc_ht=cdn.fbsbx.com&oh=b455763c8657c2af6990f955d9e72068&oe=61534311'/> */}
        </>
      ) : (
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
      )}
    </ThemeProvider>
  );
};

export default MyApp;
