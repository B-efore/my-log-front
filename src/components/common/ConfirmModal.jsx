const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="flex fixed top-[0] left-[0] w-full h-full items-center justify-center z-[9999] bg-black/15">
            <div className="round-box-border p-6 w-[300px] bg-white shadow-md">
                <p className="text-base mb-8">{message}</p>
                <div className="flex justify-end gap-2">
                    <button className="btn-second px-4 py-1" onClick={onCancel}>취소</button>
                    <button className="btn-primary px-4 py-1" onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;