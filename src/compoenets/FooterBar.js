import React, { useState } from 'react';
import './FooterBar.css';

const FooterBar = () => {
    const [walletAddress, setWalletAddress] = useState(''); // 지갑 주소 상태

    // 쿠키에서 토큰 읽기 함수
    const getCookie = (name) => {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    // 전송 요청 핸들러
    const handleSend = async () => {
        if (!walletAddress) {
            alert('지갑 주소를 입력해주세요!');
            return;
        }

        const token = getCookie('token'); // 쿠키에서 토큰 읽기
        if (!token) {
            alert('로그인이 필요합니다!');
            return;
        }

        try {
            const response = await fetch('http://3.36.7.39:8080/v1/api/send-nft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify({ code : walletAddress }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('NFT 전송 요청이 성공적으로 완료되었습니다!');
            setWalletAddress(''); 
        } catch (error) {
            console.error('Failed to send NFT:', error);
            alert('NFT 전송 요청이 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="footer-bar">
            <p>
                해당 사진을 NFT로 소장하시려면, 지갑주소를 입력해주세요.
                <br />
                2-3일 내 에어드랍으로 전송해드립니다!
            </p>
            <div className="wallet-input-container">
                <input 
                    type="text" 
                    placeholder="메타마스크 지갑주소를 입력해주세요" 
                    className="wallet-input" 
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)} // 지갑 주소 업데이트
                />
                <button className="send-button" onClick={handleSend}>
                    전송
                </button>
            </div>
        </div>
    );
};

export default FooterBar;
