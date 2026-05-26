//BookItem.jsx className 적용 ver
import React from 'react';
import './style.css';
import defaultImg from '../../../assets/images/default-background.png'
import { useNavigate } from 'react-router-dom';

export default function BookItem({
    id,
    title,
    author,
    genre,
    content,
    likes,
    views,
    summary,
    publish,
    coverImageUrl,
    createat,
    updatedat,
    onLikesToggle,
    onDelete,
    onBack
}) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const handleLikeClick = () => {
        const nextState = !isLiked;
        onLikesToggle(id, nextState);
        setIsLiked(nextState);
    };

    const handleClickDelete = async () => {
        if (window.confirm("정말 이 도서를 삭제하시겠습니까?")) {
            await onDelete(id);
            navigate('/books'); // 삭제 후 목록 화면으로 튕기기
        }
    };


    
    return (
        <li className="book-item-card">
            {/* 🛠️ 수정 / 삭제 상단 링크 영역 추가 */}
            <div className="book-item-admin-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '10px', fontSize: '0.9rem' }}>
                <button onClick={() => navigate(`/books/${id}/edit`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007BFF' }}>수정</button>
                <span style={{ color: '#ccc' }}>|</span>
                <button onClick={handleClickDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC3545' }}>삭제</button>
            </div>

            <p className="book-id">ID: #{id}</p>
            <h3 className="book-title">📖 {title}</h3>
            <h4 className="book-author">저자: {author} · <span style={{ color: '#858e96', fontSize: '0.9rem', fontWeight: 'normal' }}>{genre}</span></h4>
            
            <p className="book-meta"><strong>소개:</strong> {content}</p>
            <p className="book-meta"><strong>요약:</strong> {summary}</p>
            {publish && <p className="book-meta"><strong>출판사:</strong> {publish}</p>}
            
            {/* 📸 표지 이미지 조건문 정상화 */}
            <div className="book-cover-area" style={{ margin: '15px 0' }}>
                {coverImageUrl && coverImageUrl !== '' ? (
                    <img src={coverImageUrl} alt="도서 표지" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '4px' }} />
                ) : (
                    <img src={defaultImg} alt="기본 표지" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '4px' }} />
                )}
            </div>
            
            {createat && <p className="book-id">등록일: {createat}</p>}
            {updatedat && <p className="book-id">수정일: {updatedat}</p>}
            
            {/* 📊 하단 액션 버튼 그룹 통합 */}
            <div className="book-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {/* 좋아요 버튼 (클릭 이벤트 및 조건부 스타일 추가 가능) */}
                <button className={`action-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
                    {isLiked ? '❤️' : '👍'} {likes}
                </button>
                
                {/* 조회수 표시 (단순 뷰어이므로 div 혹은 스타일 유지용 버튼) */}
                <div className="action-button" style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', backgroundColor: '#f8f9fa' }}>
                    👀 {views}
                </div>

                {/* 목록으로 버튼 추가 */}
                <button className="action-button" onClick={onBack} style={{ marginLeft: 'auto', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' }}>
                    목록으로
                </button>
            </div>
        </li>
    );
}