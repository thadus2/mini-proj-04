import BookCard from "../BookCard/index.jsx";
import BookItem from "../BookItem/index.jsx";

// BookList.jsx
export default function BookList({posts, onCardClick}) {



    return (
        <div>
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