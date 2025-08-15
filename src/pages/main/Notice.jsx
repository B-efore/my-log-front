import { useNavigate } from "react-router-dom";
import MainPostList from "../../components/blog/MainPostList";
import Header from "../../components/header/Header";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import { useEffect, useState } from "react";
import { getAllNotices } from "../../api/postService";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/pagination/Pagination";

const Notice = () => {

    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const { pagination, updatePagination, handlePageChange, generatePageNumbers } = usePagination();

    useEffect(() => {
        const fetchNotices = async (page = pagination.currentPage, size = 8) => {
            try {
                const res = await getAllNotices(page, 10);
                setNotices(res.data.objects);
                updatePagination(res.data);
            } catch (err) {
                console.log(err);
                showErrorToast("오류 발생! 개발자 호출 필요!");
            }
        };

        fetchNotices();
    }, [pagination.currentPage]);

    const handleHello = () => {
        showSuccessToast("삐-빠이");
        showErrorToast("어디선가 구슬픈 키보드 소리가 들리는 것 같다...")
        navigate("/")
    };

    return (
        <div>
            <Header />
            <div className="fixed-w fixed-p full-body bg-green-700 text-white">

                <div className="npc-box">
                    <button
                        className="font-alien round-box-border npc-box-text"
                        onClick={handleHello}
                    >
                        ...돌아갈까?
                    </button>
                </div>
                <div className="card-body">
                    <h3 className="font-alien npc-text">* ?(°Д°≡°Д°)? 여긴 개발자의 방? *</h3>
                    <MainPostList posts={notices} />
                </div>

                <Pagination
                    pagination={pagination}
                    generatePageNumbers={generatePageNumbers}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    );
}

export default Notice;