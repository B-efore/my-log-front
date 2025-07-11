import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const AdminPage = () => {

    const {user, role} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(role != 'ROLE_ADMIN') {
            navigate("/", {replace: true});
        }
    }, [user]);

    const handleBye = () => {
        navigate("/", {
            replace: true,
        })
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 h-screen pt-14">
                <div className="justify-center flex flex-row h-fit mt-12 round-box-border w-50vw px-4 py-2 select-none">
                    <button
                        className="flex w-fit text-green-700 font-alien cursor-pointer"
                        onClick={() => navigate("/", {replace: true})}
                    >
                        돌아가자... 현실로!
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit px-20 py-8 box-border items-center gap-4">
                    <button
                        className="round-box-border w-fit h-fit p-3"
                        onClick={() => navigate("/admin/write", {replace: true})}
                    >게시글 작성</button>
                    <button
                        className="round-box-border w-fit h-fit p-3"
                        onClick={() => navigate("/admin/item/upload", {replace: true})}
                    >아이템 등록</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;