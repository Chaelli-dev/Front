import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <img src="/images/logo.png" alt="Logo" />
                <span>PROJECT CHAELLI</span>
            </div>
            <div className="navbar-buttons">
                <button className="btn register-btn" onClick={() => navigate('/login')}>입양하기</button>
                <button className="btn login-btn" onClick={() => navigate('/login')}>로그인</button>
            </div>
        </nav>
    );
};

export default Navbar;
