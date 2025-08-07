import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { showAlienToast, showErrorToast, showSuccessToast } from "../../util/toast";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import MessageList from "../blog/MessageList";
import { useAuth } from "../../context/AuthContext";
import { createGuestBook } from "../../api/guestbookService";

const BlogVisitorsTab = ({
    messages,
    setMessages,
    pagination,
    onPageChange,
    generatePageNumbers
}) => {

    const navigate = useNavigate();
    const { userId: blogOwnerId } = useParams();
    const { userId, isLoggedIn } = useAuth();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showMessageInput, setShowMessageInput] = useState(false);
    const [secret, setSecret] = useState(false);

    const handleGhostClick = () => {
        setShowMessageInput(prev => !prev);
    }

    const handleCancel = () => {
        setShowMessageInput(false);
    }

    const handleSubmit = async () => {

        if (!isLoggedIn) {
            showErrorToast("신원을 밝히십시오. (로그인 필요)");
        }

        if (!message.trim()) return;

        setLoading(true);
        try {

            const request = {
                receiverId: blogOwnerId,
                secret: secret,
                content: message,
            };

            const res = await createGuestBook(request);
            handleUpdateMessages(res.data);
            setMessage("");
        } catch (err) {
            showErrorToast("텔레파시 실패");
            console.error(err);
        } finally {
            setLoading(false);
        }

    }

    const handleUpdateMessages = (newMessage) => {
        setMessages((prev) => [newMessage, ...prev]);
    };

    return (
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-2 md:gap-3 lg:gap-4 pt-12 box-border mx-auto">
            <div className="w-full sm:w-auto flex-[1] min-w-[150px]">
                <div className="text-left flex-1">
                    <strong className="text-base font-orbit font-black text-violet-500 no-underline">
                        외계인 인사의 효능
                    </strong>
                    <p className="mt-1 text-sm underline">
                        이 페이지는 외계어를 자동으로 번역하고 있습니다.
                    </p>
                    <p className="mt-4 text-sm">
                        지원하는 외계어
                    </p>
                    <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                        <li data-tooltip-id="alien-tooltip" data-tooltip-content="당신은 지금 관찰당하고 있다">☌⟊₪⧫⩚</li>
                        <li data-tooltip-id="alien-tooltip" data-tooltip-content="기억은 조작된다">∿𖣐⧃≣⚛</li>
                        <li data-tooltip-id="alien-tooltip" data-tooltip-content="세계는 온전하지 않다">⧜ꔷ☍⋇𓊝</li>
                        <li className="cursor-pointer" data-tooltip-id="alien-tooltip" data-tooltip-content="살려줘" onClick={() => showErrorToast('비명 소리가 들리는 것 같다...')}>⫷⧖⩵☋⌖</li>
                        <li data-tooltip-id="alien-tooltip" data-tooltip-content="그들이 돌아오고 있다">⟊⨂⧈𖤐༼</li>
                        <li data-tooltip-id="alien-tooltip" data-tooltip-content="과거는 존재하지 않는다">⚿⍜⫹⧫𓆏</li>
                        <li data-tooltip-id="alien-tooltip" data-tooltip-content="과거는 존재한다">⧈⩧∰♆⧫</li>
                        <li className="cursor-pointer" data-tooltip-id="alien-tooltip" data-tooltip-content="제발 살려줘" onClick={() => showErrorToast('비명 소리가 가까워지고 있다...')}>⩢∿꙰⧃⧜</li>
                        <li data-tooltip-id="alien-tooltip" data-tooltip-content="그들은 항상 여기에 있었다">☋⧫𖣐⧈≜</li>
                        <li className="cursor-pointer" data-tooltip-id="alien-tooltip" data-tooltip-content="......" onClick={() => showSuccessToast('이제 안전해!')}>⩚⩲⫷⚛⧖</li>
                        <li>포함 44개의 외계어</li>
                    </ul>

                    <Tooltip id="alien-tooltip" place="top" effect="solid" className="alien-tooltip" />
                </div>
            </div>

            <div className="flex flex-col text-left flex-1 w-full sm:flex-[4] w-[280px] sm:w-[600px] md:w-[600px] lg:w-[750px]">
                <h3
                    onClick={handleGhostClick}
                    className={`cursor-pointer transition-all duration-300 ease-in-out text-center font-orbit font-black text-violet-700 text-xs sm:text-xl break-words select-none
                        ${showMessageInput ? "!text-green-500 " : " "}`}
                >𐔌՞･·･՞𐦯 - ─=≡Σ((((ó ì_í)=ó * 별 모아 날아가 *
                </h3>

                {showMessageInput && (
                    <div className="flex flex-col">
                        <textarea
                            rows={3}
                            value={message}
                            placeholder="텔레파시를 위한 기를 모으는 중..."
                            className="my-2 w-full px-4 py-2 rounded-md placeholder-green-500 text-green-700 border border-green-500 focus:outline-none resize-none"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div
                            className="flex justify-between gap-2 mt-2"
                        >
                            <button
                                className={secret ? "btn-second w-fit px-2 py-0.5" : "btn-primary w-fit px-2 py-0.5"}
                                onClick={() => setSecret(prev => !prev)}
                            >
                                {secret ? "보이다: 비밀" : "보이다: 전체"}
                            </button>
                            <div className="flex flex-row gap-2">
                                <button className="btn-second px-2 py-0.5" onClick={handleCancel}>
                                    취소
                                </button>
                                <button
                                    className="btn-primary px-2 py-0.5 disabled:bg-gray-300"
                                    onClick={handleSubmit}
                                    disabled={loading || !message.trim()}
                                >
                                    등록
                                </button>
                            </div>
                        </div>

                    </div>
                )}

                <MessageList
                    messages={messages || []}
                    onEdit={() => showErrorToast("아직 준비중~")}
                    onDelete={() => showErrorToast("아직 준비중~")}
                />
                <Pagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                    generatePageNumbers={generatePageNumbers}
                />
            </div>
        </div>
    );
}

export default BlogVisitorsTab;