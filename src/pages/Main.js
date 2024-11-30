import React from 'react';
import Navbar from "../compoenets/Navbar";
import { useNavigate } from 'react-router-dom';
import "./Main.css";

const Main = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="main-left">
                    <img src="/images/logo_big.png" alt="Logo" className="main-logo" />
                    
                    <h1>CHAELLI</h1>
                    <p>세상에 단 한 마리밖에 없는 사이버 도마뱀을 분양합니다</p>
                    <button className="main-button" onClick={() => navigate('/login')}>사전 등록하기</button>
                </div>
                
                <div className="main-right">
                    <img src="/images/main.png" alt="Main" className="main-image" />
                </div>
            </div>
        </div>
    );
};

export default Main;
