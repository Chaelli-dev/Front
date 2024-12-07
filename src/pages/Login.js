// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import Navbar from '../compoenets/Navbar';
import './Login.css'; // 새로 추가된 CSS 파일 가져오기

const Login = () => {
    // useEffect(() => {
    //     const { naver } = window;
    //     const naverLogin = new naver.LoginWithNaverId({
    //         clientId: '클라이언트 ID',
    //         callbackUrl: 'http://localhost:8080/login/oauth2/code/naver',
    //         isPopup: false,
    //         loginButton: { color: 'green', type: 3, height: '80' }
    //     });
    //     naverLogin.init();
    // }, []);

    const handleNaverLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";
        // window.location.href = "http://3.36.7.39:8080/oauth2/authorization/naver";
    };
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
        // window.location.href ="http://ec2-3-36-7-39.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google";
    };
    return (
        <div>
            <Navbar />
            {/* <div className="login-page">
                <div id="naverIdLogin"></div> 
            </div> */}
            <div className="login-page">
                <button onClick={handleNaverLogin} className="naver-login-button">
                    <img
                        src="/images/naver_logo.png" 
                        alt="Naver Logo"
                        className="naver-logo"
                    />
                    네이버 아이디로 로그인
                </button>
                <button onClick={handleGoogleLogin} className="google-login-button">
                    <img
                        src="/images/google_logo.webp" 
                        alt="Google Logo"
                        className="google-logo"
                    />
                    구글 아이디로 로그인
                </button>
            </div>
        </div>
    );
};

export default Login;