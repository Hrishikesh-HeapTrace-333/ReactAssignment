import React, { useState } from 'react';
import axios from 'axios';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const url = 'http://localhost:8080/api';

    const toggleAuthForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.post(`${url}/login`, {
            email,
            password,
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token); 
            console.log('Login successful:', response.data);
        }).catch (error => {
        console.error('Login error:', error);
        })
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/signin`, {
                email,
                password,
                username,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Signin successful:', response.data);
        } catch (error) {
            console.error('Signin error:', error);
        }
    };

    const validateEmail = (email) => {
        setEmail(email);
    };

    const validatePassword = (pass) => {
        setPassword(pass);
    };

    const validateConfirmPassword = (cPass) => {
        if (password !== cPass) {
            console.log('Passwords do not match');
        }
        setConfirmPassword(cPass);
    };

    return (
        <div className="col-lg-6">
            <div className="card p-4 shadow">
                {isLogin ? (
                    <>
                        <h3 className="mb-4">Login to Your Account</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => validateEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => validatePassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                        <hr />
                        <p className="text-center">
                            Don't have an account?{" "}
                            <a href="#" onClick={toggleAuthForm}>
                                Sign up here
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-4">Create an Account</h3>
                        <form onSubmit={handleSignin}>
                            <div className="mb-3">
                                <label htmlFor="signupUsername" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="signupUsername"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signupEmail" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="signupEmail"
                                    name="email"
                                    value={email}
                                    onChange={(e) => validateEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signupPassword" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="signupPassword"
                                    name="password"
                                    value={password}
                                    onChange={(e) => validatePassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => validateConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">
                                Sign Up
                            </button>
                        </form>
                        <hr />
                        <p className="text-center">
                            Already have an account?{" "}
                            <a href="#" onClick={toggleAuthForm}>
                                Login here
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
