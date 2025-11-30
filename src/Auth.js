import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = ({ setAuthData }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const API_URL = 'http://localhost:5000/api/auth';

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${API_URL}/register`, { username, password, role });
            setMessage({ type: 'success', text: res.data.message });
        } catch (err) {
            setMessage({ type: 'error', text: err.response.data.message || 'Registration failed' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });

            if (res && res.data) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userRole', user.role);
                localStorage.setItem('userId', user.id);
                setAuthData(token, user.role, user.id);
                setMessage({ type: 'success', text: 'Logged in successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Login failed: Invalid response from server.' });
            }
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message
                               ? err.response.data.message
                               : 'Login failed due to a network error or unexpected issue.';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        setAuthData(null, null, null);
        setMessage({ type: 'info', text: 'Logged out.' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'login') {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-tabs">
                <button 
                    className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => setActiveTab('login')}
                >
                    Sign In
                </button>
                <button 
                    className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                >
                    Sign Up
                </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username"
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username" 
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password" 
                        required
                    />
                </div>

                {activeTab === 'register' && (
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select 
                            id="role"
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                )}

                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <button 
                    type="submit" 
                    className="auth-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        activeTab === 'login' ? 'Sign In' : 'Create Account'
                    )}
                </button>
            </form>

            <div className="auth-footer">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Auth;