/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

import { apiUrl } from 'src/Context/contant';
// import { User } from 'src/Context/AuthContext';
export default function index() {
  const [file, setFile] = React.useState<File[]>([]);
  const router = useRouter();
  type Inputs = {
    title: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const newPost = async (values: any) => {
    const formData = Object.keys(values).reduce((formData, key) => {
      formData.append(key, values[key]);
      return formData;
    }, new FormData());
    if (file.length > 0) {
      Array.from(file).forEach((f) => formData.append('post', f));
    }
    const res = await axios.post(`${apiUrl}/posts`, formData);
    if (!res) return alert(`create post fail`);
    try {
      alert(`create post success`);
      router.push('/');
    } catch (error) {
      alert(`create post fail`);
    }
  };

  const normFile = (e: any) => {
    setFile([...file, ...e.target.files]);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [isShownHoverContent, setIsShownHoverContent] =
    React.useState<boolean>(false);

  return (
    <>
      <div className="w-full bg-gray-300 rounded-md shadow-lg my-7 sm:-w-full sm:m-auto sm:text-center">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Create Post</title>
        </Helmet>
        <form
          encType="multipart/form-data"
          className="flex flex-col sm:m-auto sm:text-center "
          onSubmit={handleSubmit(newPost)}
        >
          <div className="relative my-5">
            {' '}
            {isShownHoverContent && (
              <div className="absolute right-0 w-2/6 h-full text-black transition-all sm:right-40 sm:w-1/6">
                <h1 className="font-bold text-blue-400">
                  Writing a Great Post Title
                </h1>
                <ul className="">
                  <li className="text-sm sm:text-xl">
                    Think of your post title as a super short (but compelling!)
                    description — like an overview of the actual post in one
                    short sentence
                  </li>
                  <li className="text-sm sm:text-xl">
                    Use keywords where appropriate to help ensure people can
                    find your post by search.
                  </li>
                </ul>
              </div>
            )}
            <textarea
              placeholder="New post title here..."
              className="w-64 my-2 border-2 border-black rounded-md h-72"
              {...register('title', { required: true })}
              onClick={() => setIsShownHoverContent(true)}
              onMouseLeave={() => setIsShownHoverContent(false)}
            />
            <span className="my-2 font-bold text-pink-900">
              {errors.title && <span>This field is required</span>}
            </span>
          </div>
          Your Image{' '}
          <p className="font-bold"> If you have a picture ( no require )</p>
          <div className="relative overflow-hidden group ">
            <input
              multiple
              onChange={normFile}
              accept="image/png, image/jpeg"
              type="file"
              className="w-64 h-10 my-2 rounded-md "
            />

            <span className="absolute flex font-bold transition-all group-hover:right-16 bottom-4 -right-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
              For images we need you right click select copy image address and
              paste here
            </span>
          </div>
          <button
            className="w-6/12 m-auto my-5 border-2 border-black rounded-lg cursor-pointer sm:w-1/6"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
