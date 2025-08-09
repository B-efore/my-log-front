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
        const fetchNotices = async () => {
            try {
                const res = await getAllNotices(0, 10);
                setNotices(res.data.objects);
                updatePagination(res.data);
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
            <div className="fixed-w fixed-p flex flex-col items-center justify-center gap-4 min-h-screen h-full pt-14 bg-green-700 text-white">

                <div className="flex flex-row h-fit mt-12 w-full py-2 select-none">
                    <button
                        className="cursor-pointer flex w-full justify-center py-2 font-alien round-box-border text-xs sm:text-sm md:text-lg"
                        onClick={handleHello}
                    >
                        ...돌아갈까?
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit py-4 md:py-8 box-border">
                    <h3 className="w-fit font-alien mb-2 md:mb-4 text-base sm:text-lg break-words">* ?(°Д°≡°Д°)? 여긴 개발자의 방? *</h3>
                    <MainPostList posts={notices} />
                </div>

                {/* <div className="text-white"> */}
                    <Pagination
                        pagination={pagination}
                        generatePageNumbers={generatePageNumbers}
                        onPageChange={handlePageChange}
                        hoverColor="yellow-500"
                    />
                </div>
            {/* </div> */}

        </div>
    );
}

export default Notice;