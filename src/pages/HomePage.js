import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="hero-section">
                <div className="hero-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                    </div>
                </div>
                
                <header className="hero-header">
                    <div className="logo">
                        <h1>RequestFlow</h1>
                    </div>
                    <nav className="hero-nav">
                        <Link to="/login" className="nav-link">Sign In</Link>
                        <Link to="/register" className="nav-link primary">Get Started</Link>
                    </nav>
                </header>

                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Streamline Your Workflow Management</h1>
                        <p>
                            RequestFlow is the modern SAAS solution for efficient request management, 
                            approval workflows, and team collaboration. Boost productivity with 
                            intelligent request tracking and automated processes.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/register" className="btn btn-primary">
                                Start Free Trial
                            </Link>
                            <Link to="/login" className="btn btn-secondary">
                                Sign In
                            </Link>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        <div className="dashboard-preview">
                            <div className="preview-header">
                                <div className="preview-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="preview-content">
                                <div className="preview-card"></div>
                                <div className="preview-card"></div>
                                <div className="preview-card"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="features-section">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Fast Processing</h3>
                            <p>Accelerate request approvals with automated workflows and real-time notifications.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure & Reliable</h3>
                            <p>Enterprise-grade security with role-based access control and data encryption.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Smart Analytics</h3>
                            <p>Gain insights with comprehensive dashboards and performance metrics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;