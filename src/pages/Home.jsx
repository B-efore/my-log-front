import Header from "../components/header/Header";
import "./Home.css";

const Home = () => {
    return(
        <div>
            <Header/>
            <div className = "home-body">
                <button className="start-btn">MyLog 시작하기</button>
                <button className="mylog-btn">나의 로그</button>
            </div>
        </div>
    );
};

export default Home;