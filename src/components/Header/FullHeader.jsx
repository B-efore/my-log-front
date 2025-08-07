import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getLogoImage } from "../../util/get-images";

const FullHeader = ({
    leftChild,
    rightChild,
}) => {

    const navigate = useNavigate();
    const goHome = () => navigate("/");
    const { username } = useAuth();

    return (
        <header className="select-none w-full fixed top-0 left-0 right-0 z-[999] bg-default-ligh">
            <div className="flex h-14 px-7 items-center justify-between bg-white">
                <div className="flex items-center gap-3 md:gap-4 cursor-pointer" onClick={goHome}>
                    <img className="icon-btn w-7 h-7 md:w-8 md:h-8" src={getLogoImage()} />
                    <strong className="font-default-bold text-base break-words">{username || "mylog"}</strong>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {rightChild ? rightChild : <></>}
                </div>
            </div>
        </header>
    );
}

export default FullHeader;