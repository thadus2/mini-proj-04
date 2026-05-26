// BookDetail.jsx
import React from 'react';
import defaultImg from '../../../assets/images/default-background.png';
import FavoriteIcon from '../../../assets/images/favorite-icon.png';
import ViewIcon from '../../../assets/images/view-icon.png';
import './style.css'; // (또는 BookDetail.css) 경로에 맞게 임포트 해주세요!


export default function BookDetail({ book, onBack }) {
    return (
        <div className="book-detail-wrapper">
            <button className="go-list-button" onClick={onBack}>
                목록으로 돌아가기
            </button>
            <div className="book-detail-layout">
                <div className="book-left-col">
                    <img 
                        className="cover-image" 
                        src={book.coverImageUrl ? book.coverImageUrl : defaultImg} 
                        alt="커버" 
                    />
                </div>
                <div className="book-right-col">
                    <div className="book-header">
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-meta">
                            <strong>작가:</strong>{book.author}<strong>장르:</strong> {book.genre}
                            <span>
                                <img className='book-stat-icon' src={FavoriteIcon}/>{book.likes}
                            </span>

                            <span>                                
                                <img className='book-stat-icon' src={ViewIcon}/>{book.views}
                            </span>
                        </p>
                    </div>
                    <hr className="divider" />
                    <div className="book-section">
                        <h4>요약</h4>
                        <p className="book-summary">{book.summary}</p>
                    </div>
                    <hr className="divider" />
                    <div className="book-section">
                        <h4>본문 내용</h4>
                        <p className="book-content">{book.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}