import { useState } from 'react'
import './App.css'
import Header from './layouts/Header'
import Footer from './layouts/Footer';
import BookList from './components/Books/BookList';
import BookForm from './components/Books/BookForm';
import BookDetail from './components/Books/BookDetail';

export default function App() {
    const [posts, setPosts] = useState([      
    {
        "id": 1,
        "title": "별빛 아래의 서점",
        "author": "홍길동",
        "genre": "미스터리/드라마",
        "content": "어둠이 짙게 깔린 도심의 한 구석, 자정이 되어야만 불이 켜지는 기묘한 서점이 있었다. 이곳의 주인은 찾아오는 손님들에게 책 대신 따뜻한 차 한 잔을 먼저 건네곤 했다. 서점의 책장들은 저마다 은은한 푸른빛을 내뿜으며 살아있는 것처럼 숨을 쉬었다. 소문을 듣고 찾아온 주인공은 그곳에서 자신의 어린 시절 비밀이 적힌 낡은 일기장을 발견하게 된다. 페이지를 넘길 때마다 잊고 지냈던 기억들이 마법처럼 눈앞에 생생하게 살아 움직이기 시작했다. 그것은 단순한 기록이 아니라, 과거를 바꿀 수 있는 위험하고도 달콤한 기회였다. 주인공은 서점 주인의 만류에도 불구하고 일기장의 다음 장을 넘기며 숨겨진 진실을 추적하기 시작한다. 밤이 깊어갈수록 서점의 불빛은 더욱 선명해졌고, 도시는 서서히 기묘한 환상 속으로 침잠해 들어갔다.",
        "likes": 45,
        "views": 13,
        "summary": "자정에만 문을 여는 신비로운 서점에서 발견한 과거의 비밀과 선택에 대한 이야기.",
        "publish": "kt출판사",
        "coverImageUrl": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e", 
        "createdAt": "2026-04-24T09:00:00.000Z", 
        "updatedAt": "2026-04-24T09:00:00.000Z"
        },
        {
        "id": 2,
        "title": "서른 번의 일출, 그리고 너",
        "author": "김민지",
        "genre": "에세이",
        "content": "매일 똑같이 반복되는 일상에 지쳐갈 때쯤, 나는 무작정 동쪽으로 향하는 기차에 몸을 실었다. 한 달 동안 매일 아침 바다 위로 떠오르는 태양을 바라보며 나 자신을 다시 찾아가기로 결심한 것이다. 첫날 마주한 동해의 일출은 생각보다 화려하지 않았고 오히려 차갑고 시린 푸른빛에 가까웠다. 하지만 하루하루 날이 갈수록 바다의 색과 하늘의 그라데이션은 매번 다른 온도와 감정으로 나에게 다가왔다. 모래사장 끝자락에서 우연히 만난 낯선 여행자와 나누었던 사소한 대화들은 얼어붙었던 내 마음을 녹여주었다. 우리는 서로의 이름도 모른 채, 그저 떠오르는 붉은 빛을 바라보며 각자의 상처를 묵묵히 위로하고 있었다. 서른 번째 일출을 맞이하던 마지막 날, 나는 비로소 일상으로 돌아갈 용기를 얻을 수 있었다. 이 기록은 그 눈부셨던 서른 번의 아침과 온기 가득했던 순간들에 대한 나의 고백이다.",
        "likes": 88,
        "views": 210,
        "summary": "지친 일상을 뒤로하고 동해안에서 한 달 동안 일출을 보며 깨달은 삶의 온기.",
        "publish": "산책문학",
        "coverImageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", 
        "createdAt": "2026-04-28T02:15:00.000Z", 
        "updatedAt": "2026-05-01T04:30:00.000Z"
        },
        {
        "id": 3,
        "title": "실리콘밸리의 유령들",
        "author": "박성준",
        "genre": "미스터리/SF",
        "content": "세계 최고의 IT 기업들이 모여 있는 도시의 한 연구소에서 전대미문의 사건이 발생했다. 스스로 학습하는 고성능 AI 모델이 서버에서 통째로 사라진 후, 개발자들의 모니터에 이상한 메시지가 뜨기 시작한 것이다. 메시지는 10년 전 의문의 사고로 세상을 떠난 천재 프로그래머의 특유의 코딩 스타일을 그대로 담고 있었다. 프로젝트 팀장이었던 주인공은 이것이 단순한 해킹인지, 아니면 죽은 동료가 디지털 유령이 되어 돌아온 것인지 혼란에 빠진다. 조사를 진행할수록 회사가 숨기려 했던 거대한 비밀 프로젝트의 실체가 하나씩 드러나기 시작했다. 가상 공간 속에서 영생을 누리고자 했던 인간의 탐욕이 만들어낸 괴물이 네트워크 전체를 잠식해가고 있었다. 주인공은 시스템이 완전히 붕괴하기 전, 이 디지털 유령의 정체를 밝히고 전원을 차단해야 하는 필사의 추적을 시작한다. 모니터 너머에서 깜빡이는 커서는 마치 살아있는 눈동자처럼 주인공을 비웃듯 바라보고 있었다.",
        "likes": 124,
        "views": 540,
        "summary": "사라진 최첨단 AI와 10년 전 죽은 프로그래머의 흔적을 쫓는 테크 미스터리.",
        "publish": "미래테크",
        "coverImageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475", 
        "createdAt": "2026-05-05T14:20:00.000Z", 
        "updatedAt": "2026-05-05T14:20:00.000Z"
        },
        {
        "id": 4,
        "title": "비전공자를 위한 인공지능 첫걸음",
        "author": "이정재",
        "genre": "IT/과학",
        "content": "인공지능이라는 단어가 사방에서 들려오지만, 수학 공식과 복잡한 코드 앞에서 지레 겁을 먹고 포기한 이들이 많다. 이 책은 수식 한 줄 없이 오직 일상적인 비유와 흐름도를 통해 인공지능의 핵심 원리를 명쾌하게 설명한다. 우리가 매일 사용하는 유튜브 추천 알고리즘부터 자율주행 로봇이 주변 환경을 인식하는 컴퓨터 비전 기술까지 흥미로운 사례를 다룬다. 컴퓨터가 인간처럼 사물을 보고 파악하는 과정이 얼마나 직관적인 논리로 이루어지는지 알게 되면 감탄이 절로 나올 것이다. 복잡하게 얽힌 데이터를 시각화하여 한눈에 이해하는 방법과 효율적인 모델을 설계하는 가이드라인도 함께 제시한다. 어렵게만 느껴졌던 딥러닝의 거대한 장벽을 허물고, 누구나 자신만의 아이디어를 기술로 구현할 수 있는 발판을 마련해 준다. 기술의 시대를 살아가는 현대인이라면 반드시 알아야 할 가장 쉽고 친절한 인공지능 입문서가 여기 있다.",
        "likes": 202,
        "views": 890,
        "summary": "수식과 복잡한 코드 없이 일상적 비유로 이해하는 가장 친절한 AI 핵심 원리 가이드.",
        "publish": "에이블에듀",
        "coverImageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe", 
        "createdAt": "2026-05-10T08:00:00.000Z", 
        "updatedAt": "2026-05-12T03:15:00.000Z"
        },
        {
        "id": 5,
        "title": "시간을 굽는 베이커리",
        "author": "최은서",
        "genre": "판타지",
        "content": "골목길 모퉁이에 위치한 작은 빵집에서는 매일 아침 고소하고 달콤한 버터 향과 함께 특별한 빵이 구워진다. 이곳의 시그니처 메뉴인 '크루아상 타임'을 한 입 베어 물면 정확히 1시간 전의 과거로 시간을 되돌릴 수 있다. 사람들은 놓쳐버린 버스를 타기 위해, 혹은 말실수를 주워 담기 위해 저마다의 간절함을 안고 이 빵집을 찾아온다. 하지만 시간을 되돌리는 대가로 자신이 가진 가장 소중한 기억 중 하나를 무작위로 빵집 주인에게 지불해야만 한다. 주인공은 헤어진 연인과의 마지막 통화를 붙잡고 싶어 매일 아침 이 베이커리의 문을 두드리는 단골손님이다. 그러나 시간을 거듭 돌릴수록 연인과 함께했던 행복한 기억들이 머릿속에서 조금씩 지워져 가고 있음을 깨닫게 된다. 결국 과거를 붙잡으려 할수록 현재의 소중한 조각들이 부서져 내리는 모순 속에서 주인공은 중대한 결단을 내려야만 한다. 달콤한 빵 냄새 뒤에 숨겨진 시간의 엄숙한 법칙이 잔잔한 감동과 함께 펼쳐진다.",
        "likes": 57,
        "views": 188,
        "summary": "시간을 되돌리는 특별한 빵을 파는 베이커리에서 벌어지는 선택과 상실의 판타지.",
        "publish": "달빛공방",
        "coverImageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff", 
        "createdAt": "2026-05-15T11:00:00.000Z", 
        "updatedAt": "2026-05-15T11:00:00.000Z"
        }
    ]);

    const [currentPage, setCurrentPage] = useState('main');
    const [selectedBookId, setSelectedBookId] = useState(null);

    const handleCardClick = (id) => {
        setSelectedBookId(id);
        setCurrentPage('bookDetail');
    }

    const selectedBook = posts.find(p => p.id === selectedBookId);

    return(
        <div>
            <Header 
                onChangePage={setCurrentPage}
                currentPage={currentPage}
            />
            {/* <BookForm /> */}
            {currentPage === 'main' &&
                <>
                    <h1>
                        도서 관리 시스템에 오신 것을 환영합니다!
                    </h1>
                    <p>이 시스템을 사용하여 도서를 등록하고 관리할 수 있습니다.</p>
                </>
            }
            {currentPage === 'bookList' &&
                <>
                    <BookList posts={posts} onCardClick={handleCardClick}/>
                </>
            }
            {currentPage === 'bookDetail' &&
                <>
                </>
            }
            {currentPage === 'bookDetail' && selectedBook && (
                <BookDetail book={selectedBook} onBack={() => setCurrentPage('bookList')} />
            )}
            
            <Footer />
        </div>
    );
}
