import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import { getPosts } from "../api/postService";
import MainPostList from "../components/blog/MainPostList";

const Home = () => {

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

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 min-h-full mt-14">
                <div className="flex flex-col flex-1 w-full h-fit px-20 py-8 box-border">
                    <h3 className="w-fit font-alien-violet mb-8">* ✯⌁(⚫︎◕  ‧̫ ◕⚫︎)⚡︎✰----◓ 방가 요정! 오늘 외계인은 ■■이야~ *</h3>
                    <MainPostList posts={mainPosts} />
                </div>
            </div>
        </div>
    );
};

export default Home;