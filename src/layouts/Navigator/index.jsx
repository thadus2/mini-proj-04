//Navigator.jsx
import "./style.css";

export default function Navigator({ onChangePage, currentPage }) {
  return (
    <nav className="navigator">

      <ul className="nav-menu">

        <li 
            className={`nav-item ${currentPage === 'bookList' ? 'active' : ''}`}
            onClick={() => onChangePage('bookList')}
        >
          📚 도서 목록
        </li>

        <li 
            className="nav-item"
            onClick={() => onChangePage('bookForm')}
        >
          ➕ 도서 등록
        </li>

        {/* <li 
            className="nav-item"
            onClick={() => onChangePage('aiThumbnailGen')}
        >
          🖼️ AI 표지 생성
        </li> */}

      </ul>

    </nav>
  );
}