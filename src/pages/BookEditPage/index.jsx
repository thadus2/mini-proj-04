import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './style.css';
import BookForm from '../../components/Books/BookForm';
function BookEditPage({ books , onEdit }) {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const defaultbook = books.find(p => String(p.id) === String(id));

    return (
        <div className="book-create-page">
            <h2>✍️ 도서 수정하기</h2>
            <BookForm onEdit={onEdit} defaultBook={defaultbook}/>
        </div>
    );
}

export default BookEditPage;