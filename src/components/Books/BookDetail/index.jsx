import React from 'react';
import defaultImg from '../../../assets/images/default-background.png';
import FavoriteIcon from '../../../assets/images/favorite-icon.png';
import ViewIcon from '../../../assets/images/view-icon.png';
import './style.css';

export default function BookDetail({ book, onBack }) {
    if (!book) {
        return (
            <div className="book-detail-wrapper">
                <button className="go-list-button" onClick={onBack}>
                    목록으로 돌아가기
                </button>

                <p>도서 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

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
                        alt={book.title || '커버'}
                    />
                </div>

                <div className="book-right-col">
                    <div className="book-header">
                        <h2 className="book-title">{book.title || '제목 없음'}</h2>

                        <p className="book-meta">
                            <strong>작가:</strong> {book.author || '작가 없음'}
                            <strong> 장르:</strong> {book.genre || '장르 없음'}

                            <span>
                                <img
                                    className="book-stat-icon"
                                    src={FavoriteIcon}
                                    alt="좋아요"
                                />
                                {book.likes ?? 0}
                            </span>

                            <span>
                                <img
                                    className="book-stat-icon"
                                    src={ViewIcon}
                                    alt="조회수"
                                />
                                {book.views ?? 0}
                            </span>
                        </p>
                    </div>

                    <hr className="divider" />

                    <div className="book-section">
                        <h4>요약</h4>
                        <p className="book-summary">
                            {book.summary || '요약 정보가 없습니다.'}
                        </p>
                    </div>

                    <hr className="divider" />

                    <div className="book-section">
                        <h4>본문 내용</h4>
                        <p className="book-content">
                            {book.content || '본문 내용이 없습니다.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}