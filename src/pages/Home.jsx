import Header from "../components/header/Header";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {

    const { userId, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="home-body">
                <Loading />
                {isLoggedIn ? (
                    <button
                        className="mylog-btn"
                        onClick={() => navigate(`/${userId}`)}
                    >
                        나의 로그
                    </button>
                ) : (
                    <button
                        className="start-btn"
                        onClick={() => navigate("/login")}
                    >
                        MyLog 시작하기
                    </button>

                )
                }
            </div>
        </div>
    );
};

export default Home;