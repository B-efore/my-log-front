
const ItemList = ({ items }) => {

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full auto-rows-[1fr]">
            {items.map((item) => (
                <div
                    key={item.itemId}
                    className="flex flex-col h-full min-h-[200px] round-box-border p-5 text-left cursor-pointer hover:shadow-sm transition-shadow bg-white"
                >
                    <h2 className="text-2xl font-default-bold mb-2 text-black line-clamp-1">
                        {item.name}
                    </h2>

                    <p className="text-base text-gray-600 mb-4 line-clamp-3">
                        {item.description}
                    </p>

                    <div className="flex items-center gap-2 mt-auto pt-4">
                        <p className="text-base text-gray-600 font-default-bold line-clamp-1">
                            {item.price} 포인트야...
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;