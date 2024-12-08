import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import LoginNavbar from "../compoenets/LoginNavbar";
import FooterBar from '../compoenets/FooterBar';
import './Mypage.css';

const Mypage = () => {
    const [profiles, setProfiles] = useState([]); // 여러 개의 프로필 정보를 담을 배열
    const [isModalOpen, setIsModalOpen] = useState(false); // 코드 입력 모달
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false); // 타입 선택 모달(코드 입력)
    const [isTypeModalOpen1, setIsTypeModalOpen1] = useState(false); // 타입 선택 모달(사전등록)
    const [inputCode, setInputCode] = useState(''); // 입력 코드 값
    const [inputType, setInputType] = useState('');
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
                // const response = await fetch("https://www.chaelli.org/v1/api/user-images", {
                const response = await fetch("http://localhost:8080/v1/api/user-images", {
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

    const toggleTypeModal = () => {
        setIsTypeModalOpen(!isTypeModalOpen);
    };

    const closeTypeAndCode = (lizardType) => {
        setInputType(lizardType);
        setIsTypeModalOpen(!isTypeModalOpen);
        setIsModalOpen(!isModalOpen);
    };

    const toggleRegisterModal = () => {
        setIsTypeModalOpen1(!isTypeModalOpen1);
    };
    // 코드 업로드 요청


    const handleUpload = async () => {
        try {
            const token = getCookie("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            // const response = await fetch("https://www.chaelli.org/v1/api/upload-code", {
            const response = await fetch("http://localhost:8080/v1/api/upload-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ code: inputCode, type : inputType }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            alert("코드 입력 성공! (새로 고침)");
            setInputCode('');
            setInputType('');
            toggleModal();
        } catch (error) {
            console.error("Failed to upload code:", error);
            alert("잘못된 코드입니다!");
        }
    };


    const handleAdoptLizard = async (lizardType) => {
        try {
            const token = getCookie("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }
            // const response = await fetch("https://www.chaelli.org/v1/api/lizard", {
            const response = await fetch("http://localhost:8080/v1/api/lizard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ type: lizardType }),
            });
            
            let typeKorea = "temp";
            if(lizardType === "fat_tailed"){
                typeKorea = "펫테일게코";
            }else{
                typeKorea = "크레스티드게코";
            }
            console.log(response);
            if (response.status === 200) {
                alert(`${typeKorea} 입양이 완료되었습니다! (새로고침)`);
                toggleRegisterModal();
            } else if(response.status === 400){
                alert('사전 등록 기간이 지났습니다.');
                toggleRegisterModal();
            }else if(response.status === 404){
                alert('이미 입양한 도마뱀이 있습니다.');
                toggleRegisterModal();
            }
        } catch (error) {
            console.error('입양 요청 중 오류 발생:', error);
            alert('입양 요청 중 오류가 발생했습니다. 다시 시도해 주세요.');
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
                            <button className="code-upload-btn" onClick={toggleTypeModal}>
                                코드 입력
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
                    <div className="button-section">
                        <button className="main-button" onClick={toggleRegisterModal} >입양하기</button>
                    </div>
                </div>
            </div>

            {/* 모달 창 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>코드 입력</h2>
                        <textarea
                            className="code-input"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="여기에 코드를 입력하세요."
                        />
                        <button className="upload-btn" onClick={handleUpload}>
                            코드 입력
                        </button>
                        <button className="close-btn" onClick={toggleModal}>
                            닫기
                        </button>
                    </div>
                </div>
            )}

            {isTypeModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>어떤 도마뱀을 입양하시겠습니까?</h2>
                        <div className="lizard-options">
                            <div className="lizard-option">
                                <img
                                    src="/images/fattail.png"
                                    alt="펫테일게코"
                                    className="lizard-image"
                                />
                                <button
                                    className="lizard-button"
                                    onClick={() => closeTypeAndCode('fat_tailed')}
                                >
                                    펫테일게코 입양하기
                                </button>
                            </div>

                            <div className="lizard-option">
                                <img
                                    src="/images/crested.png"
                                    alt="크레스티드게코"
                                    className="lizard-image"
                                />
                                <button
                                    className="lizard-button"
                                    onClick={() => closeTypeAndCode('crested_gecko')}
                                >
                                    크레스티드게코 입양하기
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {isTypeModalOpen1 && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>어떤 도마뱀을 입양하시겠습니까?</h2>

                        <div className="lizard-options">
                            <div className="lizard-option">
                                <img
                                    src="/images/fattail.png"
                                    alt="펫테일게코"
                                    className="lizard-image"
                                />
                                <button
                                    className="lizard-button"
                                    onClick={() => handleAdoptLizard('fat_tailed')}
                                >
                                    펫테일게코 입양하기
                                </button>
                            </div>

                            <div className="lizard-option">
                                <img
                                    src="/images/crested.png"
                                    alt="크레스티드게코"
                                    className="lizard-image"
                                />
                                <button
                                    className="lizard-button"
                                    onClick={() => handleAdoptLizard('crested_gecko')}
                                >
                                    크레스티드게코 입양하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <FooterBar />
        </div>
    );
};

export default Mypage;
