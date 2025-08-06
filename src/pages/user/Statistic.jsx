import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useAuth } from "../../context/AuthContext";
import { getDailyStats } from "../../api/userService";
import { showErrorToast } from "../../util/toast";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const Statistic = () => {

    const { userId } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const formattedDate = formatDate(selectedDate);
    const displayDate = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;

    const handlePrevDay = () => setSelectedDate((prev) => addDays(prev, -1));
    const handleNextDay = () => {
        if (isToday) return;

        const tomorrow = addDays(selectedDate, 1);
        setSelectedDate(tomorrow);
    };


    useEffect(() => {
        const fetchStatistic = async () => {
            setIsLoading(true);
            try {
                const res = await getDailyStats(formattedDate);
                setStats(res.data);
            } catch (err) {
                console.error(err);
                showErrorToast("통계 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) fetchStatistic();
    }, [userId, selectedDate]);

    if (stats === null || isLoading) return null;

    return (
        <div className="flex w-full h-full">
            <Header />
            <div className="mt-14 w-full h-full flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 select-none">
                <div className="mb-4 sm:mb-6 w-full max-w-xs">
                    <input
                        type="date"
                        value={formattedDate}
                        max={formatDate(new Date())}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-center"
                    />
                </div>
                <div className="flex items-center mb-4 sm:mb-6">
                    <button onClick={handlePrevDay}
                        className="text-lg sm:text-xl text-gray-500 hover:text-violet-700 px-2 sm:px-4"
                    >
                        ◀
                    </button>
                    <h1 className="font-alien text-lg sm:text-2xl font-bold text-center whitespace-nowrap px-2">
                        * (「꒪౪꒪)」 {displayDate} 보고서 제출할게염 *
                    </h1>
                    <button onClick={handleNextDay}
                        disabled={isToday}
                        className={`text-lg sm:text-xl px-2 sm:px-4 transition-colors ${isToday
                            ? 'text-gray-300'
                            : 'text-gray-500 hover:text-violet-700'
                            }`}
                    >
                        ▶
                    </button>
                </div>

                <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center">
                    <StatCard label="작성한 게시글" value={stats.createdPosts} />
                    <StatCard label="작성한 댓글" value={stats.createdComments} />
                    <StatCard label="받은 푸딩" value={stats.receivedLikes} />
                    <StatCard label="받은 댓글" value={stats.receivedComments} />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value }) => {
    return (
        <div className="bg-white border rounded-2xl border-violet-700 p-5 sm:p-6 shadow-sm">
            <div className="font-alien text-violet-700 text-xl sm:text-2xl">{value}</div>
            <div className="font-alien text-gray-600 text-sm sm:text-base mt-2">{label}</div>
        </div>
    );
};


export default Statistic;