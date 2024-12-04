import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import LoginNavbar from "../compoenets/LoginNavbar";
import FooterBar from '../compoenets/FooterBar';
import './Mypage.css';

const Mypage = () => {
    const [profiles, setProfiles] = useState([]); // 여러 개의 프로필 정보를 담을 배열
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림 상태
    const [inputCode, setInputCode] = useState(''); // 입력 코드 값

    // 쿼리 파라미터에서 토큰 가져오기
    const getTokenFromQuery = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get("token"); // 쿼리 파라미터에서 `token` 값 가져오기
    };

    // 쿠키에 토큰 저장
    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setDate(expires.getDate() + days);
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
    };

    // 쿠키에서 토큰 읽기 함수
    const getCookie = (name) => {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    // 페이지 로드 시 쿼리 파라미터에서 토큰을 가져와 쿠키에 저장
    useEffect(() => {
        const token = getTokenFromQuery();
        if (token) {
            setCookie("token", token, 1); // 쿠키에 저장 (유효기간: 1일)
            console.log("Token saved to cookies:", token);
        }
    }, []);

    // 페이지가 로드될 때 GET 요청
    useEffect(() => {
        const fetchProfileData = async () => {
            const token = getCookie("token"); // 쿠키에서 토큰 읽기

            if (!token) {
                console.error("Token not found in cookies");
                return;
            }

            try {
                const response = await fetch("https://www.chaelli.org/v1/api/user-images", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Response data:", data); // 응답 데이터를 콘솔에 출력
                setProfiles(data); // 응답 데이터를 바로 설정
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    // 이미지 다운로드 핸들러
    const handleDownload = async (imageUrl, fileName) => {
        try {
            const response = await fetch(`${imageUrl}?not-from-cache-please`, {
                method: 'GET',
                mode: 'cors',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            const blob = await response.blob();
            saveAs(blob, fileName || `Image_${Date.now()}.png`); // 파일 이름을 지정 (기본값 포함)
        } catch (error) {
            console.error('이미지 저장 실패:', error);
            alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 모달 열기/닫기
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 코드 업로드 요청
    const handleUpload = async () => {
        try {
            const token = getCookie("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            const response = await fetch("https://www.chaelli.org/v1/api/upload-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ code: inputCode }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            alert("코드 업로드 성공!");
            setInputCode('');
            toggleModal(); 
        } catch (error) {
            console.error("Failed to upload code:", error);
            alert("코드 업로드 실패!");
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
                            <button className="code-upload-btn" onClick={toggleModal}>
                                코드 업로드
                            </button>
                        </div>
                    </div>

                    <div className="mypage-content">
                        {/* 프로필 정보 표시 */}
                        {profiles.length > 0 ? (
                            profiles.map((profile, index) => (
                                <div key={index} className="profile-info-container">
                                    <img
                                        src={profile.imageUrl}
                                        alt={profile.name}
                                        className="profile-image"
                                    />
                                    <div className="profile-info">
                                        <h2>{profile.name}</h2>
                                        <p>{profile.description}</p>
                                        <div className="button-group">
                                            <button
                                                className="download-btn"
                                                onClick={() => handleDownload(profile.imageUrl, `${profile.name}.png`)}
                                            >
                                                이미지 다운로드 (png)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>표시할 프로필 정보가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 모달 창 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>코드 업로드</h2>
                        <textarea
                            className="code-input"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="여기에 코드를 입력하세요."
                        />
                        <button className="upload-btn" onClick={handleUpload}>
                            코드 업로드
                        </button>
                        <button className="close-btn" onClick={toggleModal}>
                            닫기
                        </button>
                    </div>
                </div>
            )}

            <FooterBar />
        </div>
    );
};

export default Mypage;
