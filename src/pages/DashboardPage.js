import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Requests from '../Requests';
import axios from 'axios';
import './DashboardPage.css';

const DashboardPage = ({ token, userRole, userId, handleLogout }) => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else if (userRole === 'employee') {
            fetchEmployees();
        }
    }, [token, userRole, navigate]);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/employees', {
                headers: { 'x-auth-token': token },
            });
            setEmployees(res.data);
        } catch (err) {
            setMessage(err.response.data.message || 'Failed to fetch employees');
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>RequestFlow</h2>
                    <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
                        ×
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="#dashboard" className="nav-item active">
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </a>
                    <a href="#requests" className="nav-item">
                        <span className="nav-icon">📋</span>
                        Requests
                    </a>
                    <a href="#analytics" className="nav-item">
                        <span className="nav-icon">📈</span>
                        Analytics
                    </a>
                    <a href="#settings" className="nav-item">
                        <span className="nav-icon">⚙️</span>
                        Settings
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Navigation */}
                <header className="top-nav">
                    <div className="nav-left">
                        <button 
                            className="menu-button"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                        <h1>Dashboard</h1>
                    </div>
                    <div className="nav-right">
                        <div className="user-info">
                            <span className="user-role-badge">{userRole}</span>
                            <span className="user-id">ID: {userId}</span>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {message && <div className="alert alert-error">{message}</div>}

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📥</div>
                            <div className="stat-info">
                                <h3>Total Requests</h3>
                                <span className="stat-number">24</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⏳</div>
                            <div className="stat-info">
                                <h3>Pending</h3>
                                <span className="stat-number">8</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">✅</div>
                            <div className="stat-info">
                                <h3>Completed</h3>
                                <span className="stat-number">12</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🚀</div>
                            <div className="stat-info">
                                <h3>Efficiency</h3>
                                <span className="stat-number">85%</span>
                            </div>
                        </div>
                    </div>

                    {/* Requests Section */}
                    <div className="requests-section-wrapper">
                        <Requests token={token} userRole={userRole} userId={userId} employees={employees} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;