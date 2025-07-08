import Header from "../components/header/Header";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import { getPosts } from "../api/postService";
import PinnedPostList from "../components/blog/PinnedPostList";
import MainPostList from "../components/blog/MainPostList";

const Home = () => {

    const [mainPosts, setMainPosts] = useState([]);
    const { userId, isLoggedIn } = useAuth();
    const navigate = useNavigate();

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
            <div className="home-body">
                <div className="home-posts-section">
                    {/* <h2 className="main-title">안녕!</h2> */}
                    <ol className="home-blog-main-posts">
                        <MainPostList posts={mainPosts} size={mainPosts.length} />
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Home;