// BookDetail.jsx
import React from 'react';
import defaultImg from '../../../assets/images/default-background.png';

export default function BookDetail({ book, onBack }) {
    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <button onClick={onBack} style={{ marginBottom: '20px' }}>← 목록으로 돌아가기</button>
            
            <h2>{book.title}</h2>
            <p><strong>작가:</strong> {book.author} | <strong>장르:</strong> {book.genre}</p>
            
            <img src={book.coverImageUrl ? book.coverImageUrl : defaultImg} alt="커버" style={{ maxWidth: '300px', display: 'block', margin: '20px 0' }} />
            
            <div style={{ marginTop: '20px', lineHeight: '1.6' }}>
                <h4>요약</h4>
                <p>{book.summary}</p>
                <hr />
                <h4>본문 내용</h4>
                <p>{book.content}</p> {/* 👈 리스트엔 없던 진짜 상세 내용 출력! */}
            </div>
            
            <div style={{ marginTop: '20px', color: '#666' }}>
                <span>👍 {book.likes} </span>
                <span>👀 {book.views}</span>
            </div>
        </div>
    );
}