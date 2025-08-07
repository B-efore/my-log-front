import { useState } from "react";
import Header from "../../components/header/Header";
import { getGhost } from "../../util/get-images";
import { showAlienToast } from "../../util/toast";
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
            <div className="fixed-w flex flex-col items-center justify-center gap-4 min-h-full pt-14 px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="flex flex-row h-fit mt-12 w-full py-2 select-none">
                    <button
                        className="flex w-full justify-center py-2 font-alien round-box-border text-xs sm:text-sm md:text-lg"
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