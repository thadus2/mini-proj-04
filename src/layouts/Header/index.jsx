// Header.jsx
import React, { useState } from 'react';
import { Search, CircleUserRound } from 'lucide-react';
import './style.css'; 
import Navigator from '../Navigator';

function Header({ onChangePage, currentPage, onSearchKeyword }) {
  const [currentKeyword, setCurrentKeyword] = useState('');
  const handleSearchKeyword = (e) => {
    e.preventDefault();
    onSearchKeyword(currentKeyword);
  }
  return (
    <header className="header">

      {/* 왼쪽 */}
      <div className="header-left" onClick={() => onChangePage('main')}>
        <h1>도서 관리 시스템</h1>
      </div>

      {/* 가운데 네비게이션 */}
      <Navigator 
        onChangePage={onChangePage}
        currentPage={currentPage}
      />

      {/* 오른쪽 */}
      <div className="header-right">

        <div className="search-box">
          <span>🔍</span>

          <form onSubmit={handleSearchKeyword}> 
            <input 
              type='text'
              placeholder='검색'
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
            />
          </form>
        </div>

        <button className="profile-button">
          👤
        </button>

      </div>

    </header>
  );
}

export default Header