import React, { useState } from "react"; // 👈 상태 관리를 위해 useState 추가
import { useNavigate, useParams } from "react-router-dom";

export default function AiGen({ posts, onEdit }) {
    const navigate = useNavigate();
    const { id } = useParams();

    // 🎯 AI 상태 관리 변수들 추가
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateFail, setGenerateFail] = useState(false);
    const [aiResponse, setAiResponse] = useState(''); // OpenAI가 뱉은 결과 텍스트 저장
    const [imageUrl, setImageUrl] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [selectedModel, setSelectedModel] = useState('gpt-image-1'); // 기본 모델
    const [selectedSize, setSelectedSize] = useState('256x256');   // 기본 크기
    const [selectedQuality, setSelectedQuality] = useState('medium');

    const post = posts ? posts.find(p => String(p.id) === String(id)) : null;

    const handleCoverUpdate = async () => {
        try {
            const updatedData = {
                ...post,
                coverImageUrl: imageUrl
            };

            await onEdit(post.id, updatedData);

            alert('표지가 업데이트되었습니다.');
            navigate(`/books/${id}`);

        } catch(err) {
            console.error(err);

            // 수정 실패 UI
            alert('표지 업데이트에 실패했습니다.');
        }
    };

    if (!post) {
        return (
            <div className="book-detail-wrapper">
                <button className="book-detail-button" onClick={() => navigate('/books')}>
                    목록으로 돌아가기
                </button>
                <p>도서 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

    // 🚀 OpenAI API 호출 함수
    const handleGeneratePrompt = async () => {
        setIsGenerating(true);
        setGenerateFail(false);
        setImageUrl('');

        const sys_prompt = `당신은 주어진 도서의 메타데이터(제목, 저자, 내용, 장르)와 사용자의 특별 요구사항을 분석하여, 도서 커버를 생성하는 AI입니다.
        [작성 규칙]
        1. 분석 및 해석: 도서의 내용과 장르를 기반으로 전체적인 분위기(Mood), 지배적인 색상(Color Palette), 상징적인 오브젝트(Object)를 도출하세요.
        2. 사용자 요구사항 적극 반영: 사용자가 특정 화풍(Style), 구도(Composition), 화가, 분위기를 지정했을 경우, 기존 도서 내용보다 사용자의 요구사항을 최우선으로 반영하세요.
        3. 영어 출력: AI 이미지 모델이 가장 잘 이해할 수 있도록 최종 프롬프트는 반드시 '영어' 단어와 구절의 조합(Comma-separated tags)으로 작성하세요.
        4. 금지어: "Book cover", "Text", "Typography", "Title", "Author"와 같이 이미지 내에 엉뚱한 글자를 렌더링하게 만드는 단어는 절대 프롬프트에 포함하지 마세요.
        [출력 포맷]
        반드시 아래 형식을 칼같이 지켜서 응답하세요. 다른 부연 설명은 하지 마세요.
        - 도서 분위기 요약 (국문): 
        - 주요 색상 (국문): 
        - 최종 영문 프롬프트 (English): `;

        const user_prompt = `
        위 지침에 따라 아래 도서 정보를 바탕으로 영문 이미지 프롬프트를 생성해줘.
        [도서 정보]
        - 제목: ${post.title}
        - 저자: ${post.author}
        - 내용 요약: ${post.summary || post.content}
        - 장르: ${post.genre || '미정'}
        [사용자 추가 요구사항]
        - 없음 (장르와 내용에 어울리는 예술적인 화풍으로 자유롭게 생성)
        `;

        const combinedPrompt = `${sys_prompt}\n\n${user_prompt}`;

        try {
            if (!apiKey) {
                alert("OpenAI API Key를 정확히 입력해 주세요.");
                return;
            }

            // ⭕ 주소 끝에 공백이나 슬래시가 들어가지 않도록 정밀 타격하여 찌릅니다.
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: selectedModel,                 
                    prompt: combinedPrompt,           
                    n: 1,                              
                    size: selectedSize,                 
                    quality: selectedQuality,               
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("DALL-E API Error 상세:", errorData);
                throw new Error("DALL-E 이미지 생성 호출 실패");
            }

            const resData = await response.json();

            const base64RawData = resData.data[0].b64_json;
            const dataUrl = `data:image/png;base64,${base64RawData}`;
            
            setImageUrl(dataUrl); 

        } catch (err) {
            console.error("이미지 생성 중 최종 에러 발생:", err);
            setGenerateFail(true);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="ai-gen-wrapper" style={{ padding: '20px' }}>
            <h3>🎨 AI 표지 프롬프트 생성</h3>
            <input 
                type='password'
                placeholder='API Key를 입력해주세요.'
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
            <div style={{ flex: 1 }}>
                <label style={{
                    display: 'block',
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '5px'
                }}>
                    생성 모델
                </label>

                <select
                    value={selectedModel}
                    onChange={(e) => {
                        const model = e.target.value;
                        setSelectedModel(model);

                        // 모델 변경 시 기본값 자동 세팅
                        if (model === "dall-e-2") {
                            setSelectedSize("512x512");
                            setSelectedQuality("standard");
                        }

                        if (model === "dall-e-3") {
                            setSelectedSize("1024x1024");
                            setSelectedQuality("hd");
                        }

                        if (model === "gpt-image-1") {
                            setSelectedSize("1024x1024");
                            setSelectedQuality("medium");
                        }
                    }}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        color: '#000',
                        backgroundColor: '#fff',
                        fontSize: '13px'
                    }}
                >
                    <option value="dall-e-2">
                        DALL·E 2 - 빠르고 저렴
                    </option>

                    <option value="dall-e-3">
                        DALL·E 3 - 고품질
                    </option>

                    <option value="gpt-image-1">
                        GPT Image 1 - 최신 추천
                    </option>
                </select>
            </div>
            <div style={{ flex: 1 }}>
                <label style={{
                    display: 'block',
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '5px'
                }}>
                    이미지 크기
                </label>

                <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        color: '#000',
                        backgroundColor: '#fff',
                        fontSize: '13px'
                    }}
                >

                    {selectedModel === "dall-e-2" && (
                        <>
                            <option value="256x256">256x256</option>
                            <option value="512x512">512x512</option>
                            <option value="1024x1024">1024x1024</option>
                        </>
                    )}

                    {selectedModel === "dall-e-3" && (
                        <>
                            <option value="1024x1024">1024x1024</option>
                            <option value="1024x1792">1024x1792 (세로)</option>
                            <option value="1792x1024">1792x1024 (가로)</option>
                        </>
                    )}

                    {selectedModel === "gpt-image-1" && (
                        <>
                            <option value="512x512">512x512</option>
                            <option value="1024x1024">1024x1024</option>
                            <option value="1536x1024">1536x1024</option>
                            <option value="1024x1536">1024x1536</option>
                        </>
                    )}

                </select>
            </div>
            <div style={{ flex: 1 }}>
                <label style={{
                    display: 'block',
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '5px'
                }}>
                    품질
                </label>

                <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        color: '#000',
                        backgroundColor: '#fff',
                        fontSize: '13px'
                    }}
                >

                    {selectedModel === "dall-e-2" && (
                        <option value="standard">
                            standard
                        </option>
                    )}

                    {selectedModel === "dall-e-3" && (
                        <>
                            <option value="standard">standard</option>
                            <option value="hd">hd</option>
                        </>
                    )}

                    {selectedModel === "gpt-image-1" && (
                        <>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                            <option value="auto">auto</option>
                        </>
                    )}

                </select>
            </div>
            
            <div className="target-book-info" style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                <p><strong>선택된 도서:</strong> {post.title}</p>
                <p><strong>작가:</strong> {post.author}</p>
            </div>

            <button 
                onClick={handleGeneratePrompt} 
                disabled={isGenerating}
                style={{ padding: '10px 20px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
            >
                {isGenerating ? "🤖 이미지 생성 중..." : "✨ 이미지 생성하기"}
            </button>

            <hr style={{ margin: '20px 0', border: '0.5px solid #e2e8f0' }} />

            {isGenerating && (
                <div>
                    <h3>이미지를 열심히 생성하고 있습니다.. ⚙️</h3>
                </div>
            )}

            {!isGenerating && generateFail && (
                <div style={{ color: '#e53e3e' }}>
                    <h3>이미지 생성에 실패하였습니다. 다시 시도해주세요.</h3>
                </div>
            )}

            {imageUrl && (
                <div style={{ marginTop: '24px' }}>
                    <h3>🖼️ 생성된 이미지</h3>
                    <img
                        src={imageUrl}
                        alt="AI Generated"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    />
                    <button onClick={() => handleCoverUpdate()}>이미지 저장하기</button>
                </div>
            )}
        </div>
    );
};