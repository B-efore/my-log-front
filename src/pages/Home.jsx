import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import { getPosts } from "../api/postService";
import MainPostList from "../components/blog/MainPostList";
import { helloAdmin } from "../api/adminService";
import { showAlienToast, showErrorToast, showSuccessToast } from "../util/toast";
import { useNavigate } from "react-router-dom";
import { getCoinAlien } from "../util/get-images";
import { useAuth } from "../context/AuthContext";

const Home = () => {

    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const [mainPosts, setMainPosts] = useState([]);
    const [isBlocking, setIsBlocking] = useState(false);

    useEffect(() => {
        const fetchMainPosts = async () => {
            try {
                const res = await getPosts();
                setMainPosts(res.data.objects);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMainPosts();
    }, []);

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

    const handleCoinClick = () => {
        if (isBlocking) return;

        if(!isLoggedIn) {
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
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 min-h-full pt-14">
                <div className="justify-center flex flex-row h-fit mt-8 md:mt-12 round-box-border w-full max-w-md md:max-w-lg lg:max-w-xl mx-4 px-3 md:px-4 py-4 select-none animate-rainbow">
                    <button
                        className="flex w-fit font-alien animate-bounce cursor-pointer text-sm md:text-base"
                        onClick={() => navigate("/notices")}
                    >
                        !확인! ▶▷ UFO ◁◀ !확인...?!
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit px-4 sm:px-8 md:px-12 lg:px-20 py-4 md:py-8 box-border">
                    <button className="w-fit h-fit text-xs text-left text-gray-300" onClick={handleHello}>제가 보이시나요...?</button>
                    <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 mb-4">
                        <h3 className="w-fit font-alien-violet text-sm sm:text-base md:text-lg break-words">* ✯⌁(⚫︎◕  ‧̫ ◕⚫︎)⚡︎✰----◓ 운세 요정! (준비중이얌) *</h3>
                        <img className="icon-btn flex-shrink-0" src={getCoinAlien()} onClick={handleCoinClick} />
                    </div>
                    <MainPostList posts={mainPosts} />
                </div>
            </div>
        </div>
    );
};

export default Home;