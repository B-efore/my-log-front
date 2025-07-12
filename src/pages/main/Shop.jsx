import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { showAlienToast, showErrorToast, showSuccessToast } from "../../util/toast";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyPoint } from "../../api/pointService";
import ItemList from "../../components/ItemList";
import { getAllItems } from "../../api/itemService";
import ConfirmGhostModal from "../../components/common/ConfirmGhostModal";
import { purchaseItem } from "../../api/userService";
import { HttpStatusCode } from "axios";

const Shop = () => {

    const { user, isLoggedIn } = useAuth();
    const [myPoint, setMyPoint] = useState(0);
    const [items, setItems] = useState([]);
    const [showBuyConfirm, setShowBuyConfirm] = useState({ open: false, targetId: null, targetPrice: 0 });

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
    }, [user]);

    useEffect(() => {

        const fetchItems = async () => {
            try {
                const res = await getAllItems();
                console.log(res);
                setItems(res.data.objects);
            } catch (err) {
                console.log(err);
            }
        };

        fetchItems();

    }, []);

    const handleBye = () => {
        showAlienToast("잘가...", '1.5rem');
        navigate("/", {
            replace: true,
        })
    };

    const handleBuyBtn = (itemId, itemPrice) => {
        setShowBuyConfirm({ open: true, targetId: itemId, targetPrice: itemPrice });
    };

    const handleConfirmBuy = async () => {

        const { targetId, targetPrice } = showBuyConfirm;
        const res = setShowBuyConfirm({ open: false, targetId: null, targetPrice: 0 });
        await new Promise(resolve => setTimeout(resolve, 0));

        if (myPoint < targetPrice) {
            showAlienToast("돈...확인해...", '1.5rem');
            return;
        }

        try {
            await purchaseItem(targetId);
            setMyPoint(myPoint - targetPrice);

            showAlienToast("꒰´꒳`∗꒱", '1.5rem');
        } catch (err) {
            console.error(err);
            const status = err.response?.status;

            if (status === HttpStatusCode.Conflict) {
                showAlienToast("너...이미...있어...", '1.5rem');
            } else {
                showErrorToast("지금은 팔기 싫은 것 같다!");
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 min-h-screen pt-14 w-full h-full bg-violet-900 text-white">

                <div className="flex justify-center mt-12 round-box-border w-[50vw] px-4 py-2 select-none">
                    <button
                        className="flex font-alien cursor-pointer"
                        onClick={handleBye}
                    >
                        ...돌아갈까?
                    </button>
                </div>
                <div className="select-none flex flex-col flex-1 w-full h-fit px-20 py-8 box-border">
                    <h3 className="w-fit font-alien mb-2">* |´∀｀●) 포인트...눅눅하면...더...좋아... *</h3>
                    <h3 className="w-fit font-alien mb-8">* 내 포인트: {myPoint} *</h3>
                    <ItemList items={items} onClick={handleBuyBtn} />
                </div>


                {showBuyConfirm.open && (
                    <ConfirmGhostModal
                        message="구매...원해...?"
                        onConfirm={handleConfirmBuy}
                        onCancel={() => setShowBuyConfirm({ open: false, targetId: null, targetPrice: 0 })}
                    />
                )}
            </div>
        </div>
    );
};

export default Shop;