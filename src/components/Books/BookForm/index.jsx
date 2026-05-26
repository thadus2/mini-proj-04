import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import imageCompression from 'browser-image-compression';

export default function BookForm({onAdd, defaultBook, onEdit}) {
    const [title, setTitle] = useState(defaultBook?.title || '');
    const [author, setAuthor] = useState(defaultBook?.author || '');
    const [genre, setGenre] = useState(defaultBook?.genre || '');
    const [content, setContent] = useState(defaultBook?.content || '');
    const [summary, setSummary] = useState(defaultBook?.summary || '');
    const [publish, setPublish] = useState(defaultBook?.publish || '');
    const [coverimageurl, setCoverImageUrl] = useState(defaultBook?.coverImageUrl || '');
    const [likes, setLikes] = useState(defaultBook?.likes || 0);
    const [views, setViews] = useState(defaultBook?.views || 0);

    const navigator = useNavigate();
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const options = {
            maxSizeMB: 0.05,       // 최대 용량 0.05MB (약 50KB)
            maxWidthOrHeight: 500, // 가로세로 최대 500px로 조절 (미리보기에 충분한 크기)
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImageUrl(reader.result); // Base64 인코딩된 이미지 주소 저장
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error("이미지 압축 실패:", error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !author.trim() || !author.trim())
            return;

        const newBook = {
            title: title,
            author: author,
            genre: genre,
            content: content,
            summary: summary,
            publish: publish,
            coverImageUrl: coverimageurl,
            likes: likes,
            views: views
        }
        
        if (!defaultBook) {
            onAdd(newBook);

            setTitle('');
            setAuthor('');
            setGenre('');
            setContent('');
            setSummary('');
            setPublish('');
            setCoverImageUrl('');
        }
        else {
            onEdit(defaultBook.id, newBook)
            navigator(`/book/${defaultBook.id}`);
        }


    }

return (
    <div className="form-container">
      
      <form onSubmit={handleSubmit} className="book-form">
        
        {/* ⭐️ 이미지 업로드 & 미리보기 구역 */}
        <div className="image-upload-section">
          <div className="image-preview-box">
            {coverimageurl ? (
              <img src={coverimageurl} alt="커버 미리보기" className="preview-img" />
            ) : (
              <div className="no-image">🖼️ 표지 이미지가 없습니다</div>
            )}
          </div>
          <label htmlFor="file-upload" className="custom-file-upload">
            📸 표지 이미지 선택
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>

        {/* 입력 폼 구역 */}
        <div className="form-inputs-container">
            <div className="input-group">
            <label>도서 제목 *</label>
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='제목을 입력하세요'/>
            </div>

            <div className="input-row">
            <div className="input-group">
                <label>작성자 *</label>
                <input 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder='저자 이름'/>
            </div>
            
            <div className="input-group">
                <label>장르</label>
                <input 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder='예: 소설, 에세이'/>
            </div>
            </div>

            <div className="input-group">
            <label>출판사</label>
            <input 
                value={publish}
                onChange={(e) => setPublish(e.target.value)}
                placeholder='출판사 명'/>
            </div>

            <div className="input-group">
            <label>본문 내용 *</label>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='도서의 상세 내용을 적어주세요'
                rows="6"/>
            </div>

            <div className="input-group">
            <label>한 줄 요약</label>
            <input 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder='핵심 내용을 한 줄로 요약해 주세요'/>
            </div>

            <button type='submit' className="submit-btn">{defaultBook ? '✏️ 도서 수정하기' : '📚 도서 등록하기'}</button>
        </div>

      </form>
    </div>
  );
}