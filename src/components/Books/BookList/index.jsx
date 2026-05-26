import BookCard from "../BookCard/index.jsx";
import './style.css';

export default function BookList({ posts = [], onCardClick }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="book-list-container">
                <p>등록된 도서가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="book-list-container">
            {posts.map((book) => (
                <BookCard
                    key={book.id}
                    {...book}
                    onCardClick={onCardClick}
                />
            ))}
        </div>
    );
}