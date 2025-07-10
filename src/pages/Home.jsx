import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import { getPosts } from "../api/postService";
import MainPostList from "../components/blog/MainPostList";
import { helloAdmin } from "../api/adminService";
import { showErrorToast, showSuccessToast } from "../util/toast";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const [mainPosts, setMainPosts] = useState([]);

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
            navigate("/admin/write");
        } catch (err) {
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
            showErrorToast("왹");
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
            showErrorToast("금지! 차단! 통제! 봉쇄! 파괴! 박살! 제거! 말살! 척결! 소탕! 섬멸! 사형! 처형! 심판!");
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 min-h-full mt-14">
                <div className="justify-center flex flex-row h-fit mt-12 round-box-border w-50vw px-4 py-2 select-none animate-rainbow">
                    <button
                        className="flex w-fit font-alien animate-bounce cursor-pointer"
                        onClick={() => navigate("/notices")}
                    >
                        !확인! ▶▷ UFO ◁◀ !확인...?!
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit px-20 py-8 box-border">
                    <button className="w-fit h-fit text-xs text-left text-gray-300" onClick={handleHello}>제가 보이시나요...?</button>
                    <h3 className="w-fit font-alien-violet mb-8">* ✯⌁(⚫︎◕  ‧̫ ◕⚫︎)⚡︎✰----◓ 방가 요정! 오늘 외계인은 ■■이야~ *</h3>
                    <MainPostList posts={mainPosts} />
                </div>
            </div>
        </div>
    );
};

export default Home;