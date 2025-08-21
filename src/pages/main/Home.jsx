import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { getPosts } from "../../api/postService";
import MainPostList from "../../components/blog/MainPostList";
import { helloAdmin } from "../../api/adminService";
import { showAlienToast, showErrorToast, showSuccessToast } from "../../util/toast";
import { useNavigate } from "react-router-dom";
import { getCoinAlien } from "../../util/get-images";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../../components/pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";
import TopUsers from "../../components/TopUsers";
import { getRanker } from "../../api/userService";
import BannerSlider from "../../components/BannerSlider";

const Home = () => {

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [rankers, setRankers] = useState([]);
    const [mainPosts, setMainPosts] = useState([]);
    const [isBlocking, setIsBlocking] = useState(false);
    const { pagination, updatePagination, handlePageChange, generatePageNumbers } = usePagination();

    useEffect(() => {
        const fetchRankers = async () => {
            try {
                const res = await getRanker();
                setRankers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRankers();
    }, []);

    useEffect(() => {
        const fetchMainPosts = async (page = pagination.currentPage, size = 8) => {
            try {
                const res = await getPosts(page, size);
                setMainPosts(res.data.objects);
                updatePagination(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMainPosts();
    }, [pagination.currentPage]);

    const handleHello = async () => {
        try {
            await helloAdmin();
            navigate("/admin");
        } catch (err) {
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
            showErrorToast("왹");
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
        }
    };

    const handleFortune = () => {
        if (!isLoggedIn) {
            showErrorToast("살아있는 생명체만 접근 가능한 것 같다.");
            return;
        }
        navigate("/fortune");
    }

    const handleCoinClick = () => {
        if (isBlocking) return;

        if (!isLoggedIn) {
            showErrorToast("살아있는 생명체만 접근 가능한 것 같다.");
            return;
        }

        setIsBlocking(true);
        showAlienToast("...쨍그랑!");
        setTimeout(() => {
            showAlienToast("'누구...?'");
        }, 1000);
        setTimeout(() => {
            setIsBlocking(false);
            navigate('/ghost');
        }, 1000);
    };

    return (
        <div className="w-full">
            <Header />
            <div className="fixed-w full-body">
                
                <BannerSlider />
                
                <div className="px-2 flex mt-6 w-full y-full">
                    <TopUsers users={rankers} />
                </div>

                <div className="px-2 npc-box animate-rainbow">
                    <button
                        className="flex w-full justify-center py-2 font-orbit font-black animate-bounce border-2 rounded-sm bg-white cursor-pointer text-xs sm:text-sm md:text-lg"
                        onClick={() => navigate("/notices")}
                    >
                        !확인! ▶▷ UFO ◁◀ !확인...?!
                    </button>
                </div>
                <div className="card-body">
                    <button className="w-fit h-fit text-xs text-left text-gray-300" onClick={handleHello}>제가 보이시나요...?</button>
                    <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 mb-4">
                        <h3
                            className="w-fit font-orbit font-black text-violet-700 text-xs sm:text-base md:text-lg break-words"
                            onClick={handleFortune}
                        >
                            * ✯⌁(⚫︎◕  ‧̫ ◕⚫︎)⚡︎✰----◓ 오늘의 운세 요정! *
                        </h3>
                        <img className="icon-btn flex-shrink-0" src={getCoinAlien()} onClick={handleCoinClick} />
                    </div>
                    <MainPostList posts={mainPosts} />
                    <Pagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        generatePageNumbers={generatePageNumbers}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;