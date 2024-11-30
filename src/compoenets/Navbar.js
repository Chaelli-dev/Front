import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/images/logo.png" alt="Logo" />
                <span>CHAELLI</span>
            </div>
            <div className="navbar-buttons">
                <button className="btn register-btn" onClick={() => navigate('/login')}>사전등록</button>
                <button className="btn login-btn" onClick={() => navigate('/login')}>로그인</button>
            </div>
        </nav>
    );
};

export default Navbar;
