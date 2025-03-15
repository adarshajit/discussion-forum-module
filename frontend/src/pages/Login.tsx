import { useState, FormEvent, useEffect } from 'react';
import graduation from '../assets/graduation.svg';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState('john_doe');
    const [password, setPassword] = useState('test123');

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username && password) {
            login(username, password);
        }
    };

    useEffect(()=>{
      if(isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

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
                            <button type="submit" className='btn btn-neutral mt-4'>Login</button>
                        </fieldset>
                    </form>
                </div>
                <img src={graduation} className='w-90' alt="Graduation" />
            </div>
        </div>
    );
};

export default Login;
