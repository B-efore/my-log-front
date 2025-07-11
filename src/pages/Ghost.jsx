import { useState } from "react";
import Header from "../components/header/Header";
import { getGhost } from "../util/get-images";
import { showAlienToast } from "../util/toast";
import { useNavigate } from "react-router-dom";

const GHOST_MESSAGE = [
    '인간...',
    '아.........포인트...',
    '...',
    '........',
    '들어와...',
];

const Ghost = () => {

    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const handleGhostClick = () => {
        if (index < GHOST_MESSAGE.length) {
            setTimeout(() => {
                showAlienToast(GHOST_MESSAGE[index], '1.5rem');
            }, 500);
            setIndex(index + 1);
        } else {
            navigate('/ghost/shop', {
            replace: true,
        });
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 min-h-full pt-14">
                <div className="justify-center flex flex-row h-fit mt-12 round-box-border w-50vw px-4 py-2 select-none">
                    <button
                        className="flex w-fit font-alien cursor-pointer"
                    >
                        "유령...?"
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit px-20 py-8 box-border">
                    <img
                        className="mx-auto w-[450px] select-none cursor-pointer"
                        src={getGhost()}
                        onClick={handleGhostClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Ghost;