import { useNavigate } from "react-router-dom";
import MainPostList from "../components/blog/MainPostList";
import Header from "../components/header/Header";
import { showErrorToast, showSuccessToast } from "../util/toast";
import { useEffect, useState } from "react";
import { getAllNotices } from "../api/postService";

const Notice = () => {

    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await getAllNotices(0, 10);
                setNotices(res.data.objects);
            } catch (err) {
                console.log(err);
                showErrorToast("오류 발생! 개발자 호출 필요!");
            }
        };

        fetchNotices();
    }, []);

    const handleHello = () => {
        showSuccessToast("삐-빠이");
        showErrorToast("어디선가 구슬픈 키보드 소리가 들리는 것 같다...")
        navigate("/")
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 min-h-full pt-14 w-full h-screen bg-green-700 text-white">
                
                <div className="flex justify-center mt-12 round-box-border w-[50vw] px-4 py-2 select-none">
                    <button
                        className="flex font-alien cursor"
                        onClick={handleHello}
                    >
                        ...돌아갈까?
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit px-20 py-8 box-border">
                    <h3 className="w-fit font-alien mb-8">* ?(°Д°≡°Д°)? 여긴 개발자의 방? *</h3>
                    <MainPostList posts={notices} />
                </div>
            </div>
        </div>
    );
}

export default Notice;