import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from "../compoenets/LoginNavbar";
import FooterBar from '../compoenets/FooterBar';
import './Mypage.css';

const Mypage = () => {
    const navigate = useNavigate(); 
    const handleDownloadTemplate = async () => {
        try {
            const response = await fetch("http://localhost:8080/v1/api/test", {
                method: "GET",
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            navigate("/");
            
            // 파일 다운로드
            // const blob = await response.blob(); // Download the file as a blob
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement("a");
            // a.href = url;
            // a.download = "template.xlsx"; // You can change the file name
            // document.body.appendChild(a);
            // a.click();
            // a.remove();
            // window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download the template:", error);
        }
    };

    return (
        <div>
            <LoginNavbar />
            <div className="mypage-wrapper">
                <div className="mypage-container">
                    <div className="mypage-header">
                        <div className="header-left">
                            <h1>My Page</h1>
                        </div>
                        <div className="header-right">
                            <button className="code-upload-btn">코드 업로드</button>
                        </div>
                    </div>

                    <div className="mypage-content">
                        <img src="/images/nft_1.png" alt="Doma Doma" className="profile-image" />
                        <div className="profile-info">
                            <h2>Doma Doma</h2>
                            <p>Doma Doma는 도마도마만 도마뱀이에요.</p>
                            <div className="button-group">
                                <button className="download-btn">이미지 다운로드 (png)</button>
                                <button
                                    className="download-btn"
                                    onClick={handleDownloadTemplate} // Add click handler
                                >
                                    양식 다운로드
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단바 */}
            </div>
            <FooterBar />
        </div>
    );
};

export default Mypage;