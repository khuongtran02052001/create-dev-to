/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import moment from 'moment';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import { UserContext } from '../../Context/AuthContext';
import { LOCAL_STORAGE } from '../../Context/contant';
import { getNotifications } from '../../service/getPost';

const navigation = [
  { name: 'Create new account', href: '/register', current: true },
  { name: 'Login', href: '/login', current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export interface HeaderProps {
  className?: string;
}
export const Header: React.FC<HeaderProps> = (props) => {
  const limit = 10;
  const { fetchNextPage, hasNextPage, data, refetch } = useInfiniteQuery(
    'notification',
    ({ pageParam = 1 }) => getNotifications(limit, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length * limit >= lastPage.totalrows) {
          return undefined;
        }
        return allPages.length + 1;
      },
      refetchInterval: 5000,
    }
  );
  const { user } = React.useContext(UserContext);
  const defaultClassName = 'w-full ';
  const { className } = props;
  const [session] = useSession();
  return (
    <header className={className || defaultClassName}>
      <Disclosure as="nav" className="bg-gray-100">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
              <div className="relative flex items-center justify-between h-16">
                <div className="hidden sm:flex justify">
                  <Link href="/" passHref>
                    <img
                      className="cursor-pointer w-14"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSssiHpIuy3oHfutFOSic8XdsfPNLI70MSUNJRLSPa8-0lnX9_q1ZAsPL9qLK71LRmDfu4&usqp=CAU"
                    />
                  </Link>
                  <div className="relative m-auto mx-5">
                    <input
                      className="italic border-2 border-black w-72"
                      type="text"
                      placeholder="search..."
                    />
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute w-5 h-5 right-1 top-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute right-0 my-2 ">
                    {!session && user.username === '' && (
                      <>
                        <Link href="/login" passHref>
                          <button className="mx-4 transition-all transform hover:scale-110">
                            Login
                          </button>
                        </Link>
                        <button
                          onClick={() => signIn()}
                          className="mx-5 transition-all transform hover:scale-110"
                        >
                          Login With Goggle
                        </button>
                        <Link href="register" passHref>
                          <button className="p-2 text-white transition-all transform bg-blue-500 rounded-md hover:scale-110">
                            Create new account
                          </button>
                        </Link>
                      </>
                    )}
                    {session && (
                      <div className="flex ">
                        <p className="m-auto mx-4"> Hello: </p>
                        <span className="m-auto font-bold">
                          {session.user?.name}
                        </span>
                        <img
                          className="w-12 h-12 mx-4 rounded-full"
                          src={session.user?.image || ''}
                          alt="khuongdeptrai"
                        />
                        <button
                          className="transition-all transform hover:scale-110"
                          onClick={() => {
                            signOut();
                            localStorage.removeItem(LOCAL_STORAGE);
                          }}
                        >
                          Sign out
                        </button>
                        <button className="p-2 m-auto mx-2 text-white transition-all transform bg-blue-500 rounded-md hover:scale-110">
                          <Link href="/posts/new" passHref>
                            Create new post
                          </Link>
                        </button>
                      </div>
                    )}
                    {user.username !== '' && (
                      <div className="flex ">
                        <p className="m-auto "> </p>
                        <span className="m-auto mx-3 font-bold cursor-pointer truncate w-2/12">
                          {user.fullname}
                        </span>

                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div className="flex">
                            <Menu.Button className="w-10 shadow-sm focus:rounded-full hover:bg-gray-50 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                              <img
                                className="w-10 h-10 rounded-full cursor-pointer"
                                src={`https://create-minifb.herokuapp.com/avatar/${user.avatar}`}
                                alt="khuongdeptrai"
                              />
                            </Menu.Button>

                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="flex justify-center w-full mt-2 ml-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                  <BellIcon
                                    className="w-6 h-6 m-atuo"
                                    aria-hidden="true"
                                  />
                                  <div></div>
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg w-96 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          className={classNames(
                                            active
                                              ? 'bg-gray-100 text-gray-900'
                                              : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                          )}
                                        >
                                          <div
                                            style={{
                                              height: 150,
                                              overflow: 'auto',
                                              display: 'flex',
                                              flexDirection: 'column-reverse',
                                            }}
                                          >
                                            <InfiniteScroll
                                              refreshFunction={refetch}
                                              pullDownToRefresh
                                              dataLength={
                                                data?.pages?.length || 0
                                              }
                                              next={fetchNextPage}
                                              hasMore={!!hasNextPage}
                                              loader={
                                                <div className="p-4 rounded-lg shadow-md my-7 ">
                                                  <div className="w-full p-4 mx-auto border border-blue-300 rounded-md shadow">
                                                    <div className="flex space-x-4 animate-pulse">
                                                      <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
                                                      <div className="flex-1 py-1 space-y-4">
                                                        <div className="w-3/4 h-4 bg-blue-400 rounded"></div>
                                                        <div className="space-y-2">
                                                          <div className="h-4 bg-blue-400 rounded"></div>
                                                          <div className="w-5/6 h-4 bg-blue-400 rounded"></div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              }
                                              endMessage={
                                                <p
                                                  style={{
                                                    textAlign: 'center',
                                                  }}
                                                >
                                                  <b>
                                                    Yay ! You have seen it all
                                                  </b>
                                                </p>
                                              }
                                            >
                                              {data &&
                                              data.pages[0].noti.length < 1 ? (
                                                <div
                                                  className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                                                  role="alert"
                                                >
                                                  <strong className="font-bold">
                                                    OOPS!
                                                  </strong>
                                                  <span className="block sm:inline">
                                                    You don&rsquo;t have any
                                                    notification
                                                  </span>
                                                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                                    <svg
                                                      className="w-6 h-6 text-red-500 fill-current"
                                                      role="button"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                    >
                                                      <title>Close</title>
                                                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                                    </svg>
                                                  </span>
                                                </div>
                                              ) : (
                                                data?.pages.map((it) => {
                                                  return it.noti.map(
                                                    (nt: any) => {
                                                      return (
                                                        <Link
                                                          key={nt._id}
                                                          href={`/post/${nt.postId._id}`}
                                                          passHref
                                                        >
                                                          <div className="relative cursor-pointer">
                                                            <div className="flex p-3 m-auto mt-6 border-2 border-opacity-0 border-light-blue-500 hover:border-opacity-100">
                                                              <img
                                                                src={`https://create-minifb.herokuapp.com/avatar/${nt.sender.avatar}`}
                                                                className="w-10 h-10 rounded-full cursor-pointer"
                                                              />
                                                              <div className="flex ">
                                                                <span className="mx-1 font-bold">
                                                                  {
                                                                    nt.sender
                                                                      .username
                                                                  }
                                                                  :
                                                                </span>
                                                                <span>
                                                                  {nt.message}
                                                                </span>
                                                              </div>
                                                            </div>
                                                            <div className="absolute top-8 left-16">
                                                              {moment(
                                                                nt?.createdAt
                                                              ).fromNow()}
                                                            </div>
                                                          </div>
                                                        </Link>
                                                      );
                                                    }
                                                  );
                                                })
                                              )}
                                            </InfiniteScroll>
                                          </div>
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-0 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="/posts/new"
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      Create new post
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href={`/user/${(user as any)._id}`}
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      Your personal page
                                    </a>
                                  )}
                                </Menu.Item>

                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        signOut();
                                        localStorage.removeItem(LOCAL_STORAGE);
                                      }}
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm'
                                      )}
                                    >
                                      Sign out
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 transition-all transform rounded-md hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="absolute inset-y-0 right-0 items-center hidden pr-2 text-white bg-blue-600 rounded sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="p-2 transition-all transform hover:scale-110 ">
                    <button>Create account</button>
                  </div>
                </div>
                <div className="hidden p-2 transition-all transform hover:scale-110 ">
                  <button>Login</button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-200 text-black'
                        : 'text-gray-300 hover:bg-gray-200 hover:text-black',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};
