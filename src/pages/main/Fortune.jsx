import { useNavigate } from "react-router-dom";
import { showAlienToast } from "../../util/toast";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDailyFortune } from "../../api/openAiService";

const Fortune = () => {

    const { userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fortune, setFortune] = useState(null);

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

    return (
        <div className="h-screen overflow-hidden font-orbit">
            <Header />
            <div className="flex flex-col fixed-w bg-[url('/8269622.jpg')] bg-cover bg-center items-center justify-center h-[calc(100vh)] pt-14 px-14 select-none">
                {loading ? (
                    <div className="bg-black p-8 w-4/5 sm:w-3/4 md:w-2/5 lg:w-2/5 round-box-border border-5 border-white">
                        <p className="text-whitealien">낯선 존재가 당신을 응시하고 있습니다...</p>
                    </div>

                ) : (
                    <div className="bg-black p-8 max-h-[60vh] responsible-w overflow-auto round-box-border border-5 border-white">
                        <div className="text-white text-md whitespace-pre-wrap">
                            {fortune}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fortune;