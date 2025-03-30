import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import graduation from '../assets/graduation.svg';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('Oliver Smith');
  const [password, setPassword] = useState('test123');
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      await login(username, password);
    }
  };

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row'>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <form className='card-body' onSubmit={handleSubmit}>
            <fieldset className='fieldset'>
              <label className='fieldset-label'>Username</label>
              <input
                type='text'
                className='input'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className='fieldset-label'>Password</label>
              <input
                type='password'
                className='input'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='submit' className='btn btn-neutral mt-4'>
                Login
              </button>
            </fieldset>
          </form>
        </div>
        <img src={graduation} className='w-90' alt='Graduation' />
      </div>
    </div>
  );
};

export default Login;
