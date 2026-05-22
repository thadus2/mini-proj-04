// BookForm.jsx
import { useState } from 'react';

export default function BookForm({onAddPost}) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [publish, setPublish] = useState('');
    const [coverimageurl, setCoverImageUrl] = useState('');


    const handleClick = () => {
        if (!title.trim() || !author.trim() || !author.trim())
            return;

        const newBook = {
            title: title,
            author: author,
            genre: genre,
            content: content,
            summary: summary,
            publish: publish,
            coverimageurl: coverimageurl
        }
        
        onAddPost(newPost);

        setTitle('');
        setAuthor('');
        setGenre('');
        setContent('');
        setSummary('');
        setPublish('');
        coverimageurl('');
    }

    return (

        <form onSubmit={handleClick}>
            <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목'/>
            <input 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='작성자 명'/>
            <input 
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder='장르'/>
            <input 
            value={publish}
            onChange={(e) => setPublish(e.target.value)}
            placeholder='출판사 명'/>
            <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='본문 내용'/>
            <input 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder='본문 요약'/>
            <button type='submit'>제출하기</button>
        </form>
    )

}