import React from 'react';
import './Header.css';
import logo from '../../../../assets/KDsearch_logo.svg'; // ロゴ画像のパスを正確に合わせてください
import { FaUsers, FaPaperPlane, FaBell, FaMapMarkerAlt } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* 左側: ロゴ */}
      <div className="header-left">
        <img src={logo} alt="KD Search Logo" className="header-logo" />
        <span className="header-title">KD Search</span>
      </div>

      {/* 右側: アイコンとログアウトボタン */}
      <div className="header-right">
          <FaBell className="header-icon" />
          <FaMapMarkerAlt className="header-icon" />
          <IoHome className="header-icon" onClick={() => navigate("/lost-items")}/>
          <button className="logout-button" onClick={() => navigate("/GoogleLogin")}>Logout</button>        
      </div>
    </header>
  );
};

export default Header;
