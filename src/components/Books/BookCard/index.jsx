// BookCard
import React from 'react';
import defaultImg from '../../../assets/images/default-background.png';

export default function BookCard(props) {

    return (
        <button onClick={() => props.onCardClick(props.id)}>
            <h3>제목: {props.title}</h3>
            <p>장르: {props.genre}</p>
            <img src={props.coverImageUrl} style={{'width':'100%', 'height':'auto'}}/>
            <p>요약 내용: {props.summary}</p>
            <p>작성자: {props.author}</p>
            <span>👍👍 {props.likes}</span>
            <span>😎😎 {props.views}</span>
        </button>
    );
}
