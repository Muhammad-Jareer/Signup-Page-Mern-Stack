import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import {LoginSocialFacebook} from "reactjs-social-login"

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
        flow: 'auth-code',
        redirectUri: 'http://localhost:5173/'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary min-vh-100'>
            <div className='bg-white p-4 rounded-lg shadow-sm' style={{ maxWidth: '400px' }}>
                <h2 className='text-center mb-4'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'><strong>Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='name'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type='submit' className='btn btn-success w-100'>Register</button>
                    <p className='mt-3 text-center'>Already have an account? <Link to='/login' className='text-decoration-none'>Login</Link></p>
                </form>

                <div className='text-center mt-3'>

                    <GoogleLoginButton 
                        className='btn btn-danger btn-md'
                        onClick={() => login()}>
                        Signup with Google
                    </GoogleLoginButton>

                    <LoginSocialFacebook
                        appId='373123765723629'
                        onResolve={(res) => {
                        console.log(res); 
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                    >
                         <FacebookLoginButton>
                            Signup with Facebook
                         </FacebookLoginButton>
                    </LoginSocialFacebook>
                </div>
            </div>
        </div>
    );
};

export default Signup;
