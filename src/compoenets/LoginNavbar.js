import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginNavbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="/images/logo.png" alt="Logo" className="navbar-logo" onClick={() => navigate('/detail')}/>
                <div>
                    <span onClick={() => navigate('/detail')}>PROJECT</span>
                    <br/>
                    <span onClick={() => navigate('/detail')}>CHAELLI</span>
                </div>
                <button className="navbar-link" onClick={() => navigate('/detail')}>About</button>
            </div>
            <div className="navbar-buttons">
                <button className="btn mypage-btn" onClick={() => navigate('/mypage')}>마이페이지</button>
                <button className="btn logout-btn" onClick={() => navigate('/')}>로그아웃</button>
            </div>
        </nav>
    );
};

export default Navbar;