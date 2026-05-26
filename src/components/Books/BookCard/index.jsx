import React from 'react';
import defaultImg from '../../../assets/images/default-background.png';
import './style.css';

export default function BookCard(props) {
    return (
        <button className="book-card" onClick={() => props.onCardClick(props.id)}>
            
            <div className="image-wrapper">
                <span className="genre-badge">{props.genre}</span>
                <img 
                    src={props.coverImageUrl ? props.coverImageUrl : defaultImg} 
                    alt={props.title} 
                />
            </div>

            <div className="content-box">
                <h3 className="title">{props.title}</h3>
                <p className="author">{props.author}</p>
                <p className="summary">{props.summary}</p>
                
                <div className="card-footer">
                    <span className="stat">👍 {props.likes}</span>
                    <span className="stat">😎 {props.views}</span>
                </div>
            </div>
            
        </button>
    );
}