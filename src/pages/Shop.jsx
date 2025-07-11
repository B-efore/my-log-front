import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { showAlienToast } from "../util/toast";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyPoint } from "../api/pointService";

const Shop = () => {

    const { isLoggedIn } = useAuth();
    const [myPoint, setMyPoint] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyPoint = async () => {
            try {
                const res = await getMyPoint();
                setMyPoint(res.data.currentAmount);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMyPoint();
    }, []);

    const handleBye = () => {
        showAlienToast("잘가...", '1.5rem');
        navigate("/", {
            replace: true,
        })
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 h-screen pt-14 bg-violet-900">
                <div className="justify-center flex flex-row h-fit mt-12 round-box-border w-50vw px-4 py-2 select-none">
                    <button
                        className="flex w-fit text-white font-alien cursor-pointer"
                        onClick={handleBye}
                    >
                        아직 준비 중인 것 같다 ...돌아가자!
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit px-20 py-8 box-border">
                    <p className="w-fit font-alien text-white">내 포인트: {myPoint}</p>
                </div>
            </div>
        </div>
    );
};

export default Shop;