/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import { Form, Button } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';

import { apiUrl } from 'src/Context/contant';

import load from '../../animation/loading.module.css';

export default function index() {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  const onFinish = async (values: any) => {
    const formData: any = Object.keys(values).reduce((data, key) => {
      data.append(key, values[key]);
      return data;
    }, new FormData());
    if (file) {
      formData.append('avatar', file);
    }
    const res = await axios.post(`${apiUrl}/auth/register`, formData);
    if (!res) {
      alert('Fail');
      return;
    }
    try {
      alert(`Register successfully`);
      router.push('/');
    } catch (error) {
      alert(`Register fail`);
    }
  };

  const normFile = (e: any) => {
    setFile(e.target.files[0]);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className={load.animated}></div>
      ) : (
        <div className="w-6/12 m-auto text-center bg-gray-300 rounded-md shadow-lg my-7">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Register</title>
          </Helmet>
          <Form
            encType="multipart/form-data"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="flex flex-col w-6/12 m-auto text-center"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                {
                  type: 'email',
                  message: 'Please enter your email!',
                },
              ]}
            >
              <input className="w-6/12 m-auto my-5 border-2 border-black rounded-lg " />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="my-5"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <input
                type="password"
                className="w-6/12 m-auto my-5 border-2 border-black rounded-lg "
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <input
                type="password"
                className="w-6/12 m-auto my-5 border-2 border-black rounded-lg "
              />
            </Form.Item>

            <Form.Item
              label="Name: "
              name="fullname"
              rules={[
                { required: true, message: 'Please input your name!' },
                {
                  min: 3,
                  message: 'ten dai ti ',
                },
                {
                  max: 12,
                  message: 'ten ngan thui ',
                },
              ]}
            >
              <input
                placeholder="khuong dep trai"
                className="w-6/12 m-auto my-5 border-2 border-black rounded-lg "
              />
            </Form.Item>

            <input
              type="file"
              onChange={normFile}
              accept="image/png, image/jpeg"
              className="w-6/12 m-auto my-5 border-2 border-black rounded-lg "
            />

            <Form.Item className="my-5" wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}
