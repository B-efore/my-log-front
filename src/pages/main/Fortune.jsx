import { useNavigate } from "react-router-dom";
import { showAlienToast } from "../../util/toast";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDailyFortune } from "../../api/openAiService";
import MarkdownView from "../../components/post/MarkdownView";

const Fortune = () => {

    const { userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fortune, setFortune] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchDailyFortune = async () => {
            setLoading(true);
            try {
                const res = await getDailyFortune();
                console.log(res);
                setFortune(res.data.content);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchDailyFortune();
        }

    }, [userId]);

    const handleGhostClick = () => {
        if (index < GHOST_MESSAGE.length) {
            setTimeout(() => {
                showAlienToast(GHOST_MESSAGE[index], '1.5rem');
            }, 500);
        } else {
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col bg-[url('/8269622.jpg')] bg-cover bg-center items-center justify-center gap-4 min-h-screen pt-14 px-14 select-none">
                {loading ? (
                    <div className="bg-black p-8 w-4/5 sm:w-3/4 md:w-2/5 lg:w-2/5">
                        <p className="text-white font-alien">낯선 존재가 당신을 응시하고 있습니다...</p>
                    </div>

                ) : (
                    <div className="bg-black p-8 w-4/5 sm:w-3/4 md:w-2/5 lg:w-2/5">
                        <div className="text-white font-alien">
                            {/* {fortune} */}
                            <MarkdownView content={fortune} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fortune;