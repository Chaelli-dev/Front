import React from 'react';
import './FooterBar.css';

const FooterBar = () => {
    return (
        <div className="footer-bar">
            <p>
                해당 사진을 NFT로 소장하시려면, 지갑주소를 입력해주세요.
                <br />
                2-3일 내 에어드랍으로 전송해드립니다!
            </p>
            <input 
                type="text" 
                placeholder="메타마스크 지갑주소를 입력해주세요" 
                className="wallet-input" 
            />
        </div>
    );
};

export default FooterBar;