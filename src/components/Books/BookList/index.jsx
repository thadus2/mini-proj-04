import BookCard from "../BookCard/index.jsx";
import BookItem from "../BookItem/index.jsx";
import './style.css';
// BookList.jsx
export default function BookList({posts, onCardClick}) {

    return (
        <div className='book-list-container'>
            {posts.map(p => 
                <BookCard
                key={p.id}
                {...p}
                onCardClick={onCardClick}
                />
            )}
        </div>
    );
}