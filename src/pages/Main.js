import React from 'react';
import Navbar from "../compoenets/Navbar";
import './Detail.css';
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
                    <button className="main-button" onClick={() => navigate('/login')}>도마뱀 입양하기</button>
                </div>

                <div className="main-right">
                    <img src="/images/main.jpeg" alt="Main" className="main-image" />
                </div>
            </div>
            <div className="detail-container">
                <div className="detail-section">
                    <h1>ABOUT CHAELLI</h1>
                    <p>
                        그림 그리는 파충류 집사 "챌리"입니다!<br />
                        시각영상디자인을 전공하며 귀여운 캐릭터가 주는 소소한 즐거움에 대해 꾸준히 생각해 왔습니다. 평소 다양한 동물을 좋아해 오다가 주류인 강아지나 고양이가 아닌 파충류의 매력에도 빠지게 되었습니다. 파충류가 주는 매력이나 특징을 극대화하여 그 아름다움과 멋짐을 전하고자 합니다.<br />
                        <br />
                        펫테일게코 디저트 시리즈 일러스트가 호평을 받아, 국내 펫테일게코 전문 업체 중 가장 큰 업체인 '칵테일샵'과의 모프 포스터를 콜라보 진행 중에 있습니다. 외에 파충류 샵과 개인 분양자의 로고, 소장용 일러스트 등을 그리며 활동 중입니다.<br />
                        <br />
                        오는 12월 말, 대한민국 파충류 취미 시장 최초로 열리는, 작가 단체전 탈피 -첫번째 껍질 - 展에 참여합니다.<br />
                    </p>
                    <img src="/images/detail_main_big.png" alt="About Chaelli" className="detail-image" />
                </div>

                <div className="detail-section">
                    <h1>ABOUT THE PROJECT</h1>
                    <p>
                        도마뱀을 키우고 계시나요?<br />
                        <br />
                        도마뱀을 키우지 않는 분도, 도마뱀을 키우시는 분도... <br />
                        부담 없이 데려가실 수 있는 나만의 사이버 도마뱀 한 마리(아니, 두 마리까지) 어떠세요?<br />
                        <br />
                        이 도마뱀은 온습도를 신경쓰지 않아도, 격일로 밥을 주거나 하지 않아도, <br />
                        하루에 두번 분무를 해 주지 않아도 여러분의 곁에 쭉 있어줄 거예요.<br />
                        <br />
                        여러분의 저장공간 한켠에 데이터 놓을 자리만 놔 주신다면 예상수명은 100년, 아니 평생일지도요.<br />
                        이 도마뱀을 입양하신 도마뱀 집사님들과 이야기를 나누고 싶으시다면 &nbsp;
                        <a href="https://open.kakao.com/o/gkLQY12g" target="_blank" rel="noopener noreferrer">
                            여기(오픈톡 링크)로
                        </a>
                        &nbsp;와주세요.
                    </p>
                    <img src="/images/main.jpeg" alt="About Project" className="detail-image" />
                </div>

                <div className="detail-section detail-highlight">
                    <h2>세상에 단 한 마리밖에 없는 사이버 도마뱀을 분양합니다</h2>
                </div>

                <div className="detail-footer">
                    <div className="social-link">
                        <a href="https://www.instagram.com/chaellizard/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/instagram.png" alt="Instagram" className="social-icon" />
                        </a>
                        <p>Chaelli</p>
                    </div>
                    <div className="social-link">
                        <a href="https://www.instagram.com/chaellizard_works?igsh=MXR2eGo0Zmw2bTlpaA==" target="_blank" rel="noopener noreferrer">
                            <img src="/images/instagram.png" alt="Instagram Works" className="social-icon" />
                        </a>
                        <p>Chaelli Works</p>
                    </div>
                    <div className="social-link">
                        <a href="https://x.com/mynameischaelli/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/x.png" alt="X" className="social-icon" />
                        </a>
                        <p>Chaelli on X</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
