import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await doRequest();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className='form-group'>
          <label htmlFor='email'>Email Addresss</label>
          <input
            type='text  '
            id='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Sign in</button>
      </form>
      {errors}
    </>
  );
};

export default Signin;
