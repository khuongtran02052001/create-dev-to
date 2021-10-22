/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
import React from 'react';

import moment from 'moment';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';

import { UserContext } from 'src/Context/AuthContext';
import { LOCAL_STORAGE } from 'src/Context/contant';
import { getDataUser, getUserId } from 'src/service/getPost';

import { Post } from '@/components/News/NewsPost';

interface IndexProps {
  title: string;
  posts: Post[];
  username: string;
  url: string[];
  userId: any;
  _id: number;
  likes: string[];
  comments: [];
  createdAt: string;
}
const Personal: React.FC<IndexProps> = (props) => {
  const { user } = React.useContext(UserContext);

  const [post] = React.useState<IndexProps[]>(props.userId.posts);

  const router = useRouter();

  React.useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE)) {
      alert(`Please login , otherwise you are only in view`);
      router.push(`/404`);
    }
  }, []);

  if (router.isFallback) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{user.username}</title>
      </Helmet>
      <main>
        <div className="relative py-6 mx-auto mt-16 max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-center h-full mt-6 border-4 border-gray-200 border-dashed rounded-lg shadow-lg ">
              <div className="block text-center">
                {user && (
                  <div className="absolute top-0 -translate-x-1/2 left-1/2">
                    <img
                      className="rounded-full w-36 h-36"
                      src={`https://create-minifb.herokuapp.com/avatar/${user.avatar}`}
                    />
                    <span className="text-3xl font-bold truncate w-6/12">
                      {user.fullname}
                    </span>
                    <div className="block text-center">
                      total posts : {post.length}
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 p-32 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {post && post?.length < 1 ? (
                  <p>cho nay dang suy nghi </p>
                ) : (
                  post.map((item: IndexProps) => {
                    return (
                      <Link href={`/post/${item._id}`} key={item._id}>
                        <div className="my-auto">
                          <div className="relative shadow-2xl cursor-pointer group">
                            {item.url.length > 0 &&
                              item.url.map((url: any, index) => {
                                return (
                                  <div
                                    key={url._id || index}
                                    className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none"
                                  >
                                    <img
                                      src={`https://create-minifb.herokuapp.com/${url}`}
                                      alt="not img"
                                      className="object-cover object-center w-full "
                                    />
                                  </div>
                                );
                              })}
                            <div className="p-6 mt-4 text-center">
                              <div className="absolute bottom-0 text-sm -translate-x-1/2 left-1/2">
                                {moment(item.createdAt).fromNow()}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-700 truncate">
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 "
                                  />
                                  {item.title}
                                </h3>
                                <p className="flex justify-center mt-1 text-sm text-gray-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                      clipRule="evenodd"
                                    />
                                  </svg>{' '}
                                  {item.likes.length}
                                </p>
                              </div>
                              <p className="flex justify-center text-sm font-medium text-gray-900">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                </svg>
                                {item.comments.length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await getUserId();
  const paths = users.user.map((user: { _id: string }) => ({
    params: { id: user._id },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userId = await getDataUser(params?.id);
  return {
    props: {
      userId,
    },
  };
};

export default Personal;
