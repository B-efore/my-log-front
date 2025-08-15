const ItemList = ({ items, onClick }) => {

    return (
        <div className="grid-body">
            {items.map((item) => (
                <div
                    key={item.itemId}
                    className="round-box-border card-box"
                >
                    <h2 className="font-orbit card-title">
                        {item.name}
                    </h2>

                    <p className="card-content">
                        {item.description}
                    </p>

                    <div className="flex items-end justify-between mt-auto pt-4">
                        <p className="card-under-left-text">
                            {item.price} 포인트야...
                        </p>
                        <button
                            className="text-black round-box-border px-2 py-1 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => onClick(item.itemId, item.price)}
                        >구매 요청
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;