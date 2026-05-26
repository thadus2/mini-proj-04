import { useEffect, useState } from 'react'
import './App.css'
import Header from './layouts/Header'
import Footer from './layouts/Footer';
import BookList from './components/Books/BookList';
import BookForm from './components/Books/BookForm';
import BookDetail from './components/Books/BookDetail';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import BookCreatePage from './pages/BookCreatePage';
import BookEditPage from './pages/BookEditPage';

export default function App() {
    const [posts, setPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   
    const [selectedIds, setSelectedIds] = useState([]);
    const [message, setMessage] = useState('');

    const BASE_URL = 'http://localhost:3000';
    const BOOK_API = '/books';

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const response = await fetch(`${BASE_URL}${BOOK_API}`);
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            setLoading(false);
        }
    };
    const handleAddBook = async (newBook) => {
        try {
            const res = await fetch(`${BASE_URL}${BOOK_API}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newBook)
            });
            const data = await res.json();
            setPosts([data, ...posts]);
            alert('도서 등록이 완료되었습니다.'); 
            // 🚨 navigate는 여기서 빼고, BookCreatePage 내부에서 처리하세요!
        } catch(err) {
            console.error(err);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("정말 이 도서를 삭제합니까?")) return;
        try {
            await fetch(`${BASE_URL}${BOOK_API}/${id}`, { method: 'DELETE' });
            // books ➡️ posts 로 수정 완료!
            setPosts(posts.filter(p => p.id !== id));
            alert('도서 삭제가 완료되었습니다.');
            // 🚨 navigate 제거됨
        } catch(err) {
            console.error(err);
            alert('도서 삭제에 실패했습니다.');
        }
    };
    const handleMultipleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("삭제할 도서를 먼저 선택해 주세요!");
            return;
        }

        if (!window.confirm(`선택한 ${selectedIds.length}권의 도서를 정말 삭제하시겠습니까?`)) return;

        try {
            await Promise.all(
                selectedIds.map(id => 
                    fetch(`${BASE_URL}${BOOK_API}/${id}`, { method: 'DELETE' })
                )
            );

            // 서버 삭제 성공 후 화면(State)에서도 삭제 처리
            setPosts(posts.filter(book => !selectedIds.includes(book.id)));
            setSelectedIds([]); // 삭제 후 선택 초기화
            alert("선택한 도서가 삭제되었습니다.");
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("일부 도서 삭제에 실패했습니다.");
        }
    };
    const handleUpdate = async (id, updatedBook) => {
        try {
            const res = await fetch(
                `${BASE_URL}${BOOK_API}/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedBook)
                }
            );

            if (!res.ok) {
                throw new Error('수정 실패');
            }

            const data = await res.json();

            setBooks(
                books.map(book =>
                    book.id === id ? data : book
                )
            );

            setMessage('도서 수정이 완료되었습니다.');
            navigate(`/books/${id}`);

        } catch(err) {
            console.error(err);

            // 수정 실패 UI
            setMessage('도서 수정에 실패했습니다.');
        }
    };

    const handleEdit = async (id, edited) => {
        try {
            const res = await fetch(`${BASE_URL}${BOOK_API}/${id}`, {
                method: 'PATCH', // 혹은 백엔드 스펙에 따라 PUT
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(edited)
            });
            const update = await res.json();
            // books ➡️ posts 로 수정 완료!
            setPosts(posts.map(p => p.id === id ? update : p));
        } catch(err) {
            console.error(err);
        }
    };
    const handleViewsPlus = async (id) => {
        try {
            // books ➡️ posts 로 수정 완료!
            const book = posts.find(p => p.id === id);
            const res = await fetch(`${BASE_URL}${BOOK_API}/${id}`, {
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({views: book.views + 1})
            });
            const update = await res.json();
            setPosts(posts.map(p => p.id === id ? update : p));
        } catch(err) {
            console.error(err);
        }
    };

const handleLikesToggle = async (id, isLiked) => {
        try {
            const book = posts.find(p => p.id === id);
            const res = await fetch(`${BASE_URL}${BOOK_API}/${id}`, {
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({likes: isLiked ? book.likes + 1 : book.likes - 1})
            });
            const update = await res.json();
            setPosts(posts.map(p => p.id === id ? update : p));
        } catch(err) {
            console.error(err);
        }
    };
    
    const handleSelectToggle = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    if (loading)
        return (
            <p>
                로딩중 입니다...
            </p>
        );

    return(
        <HashRouter>
            <Header 
                onSearchKeyword={setSearchKeyword}
            />
            <Routes>
                <Route path='/' element={
                    <>
                        <h1>도서 관리 시스템에 오신 것을 환영합니다!</h1>
                        <p>이 시스템을 사용하여 도서를 등록하고 관리할 수 있습니다.</p>
                    </>
                } />
                <Route path="/books" element={
                    <>
                        <div className="book-list-header">
                            <div className="book-list-actions">
                                <button 
                                    className="btn-delete"
                                    onClick={handleMultipleDelete} 
                                >
                                    삭제
                                </button>
                                <Link to="/create">
                                    <button className="btn-register">
                                        도서 등록
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <BookList 
                            posts={posts.filter(post => 
                                post.title && post.title.includes(searchKeyword)
                            )} 
                            selectedIds={selectedIds}          // 선택된 도서 ID 목록
                            onSelectToggle={handleSelectToggle} // 체크박스 토글 함수
                        />
                    </>
                } />
                <Route path="/books/:id" element={
                        <BookDetail 
                            posts={posts}
                            onViewsPlus={handleViewsPlus}
                        /> 
                } />
                <Route 
                    path="/create" 
                    element={<BookCreatePage onAdd={handleAddBook} 
                />} />
                <Route 
                    path='/books/:id/edit'
                    element={<BookEditPage 
                    onEdit={handleEdit} 
                    posts={posts}/>} 
                />
            </Routes>
            <Footer />
        </HashRouter>
    );
}
