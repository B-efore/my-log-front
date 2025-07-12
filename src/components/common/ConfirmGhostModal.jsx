const ConfirmGhostModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="flex fixed top-[0] left-[0] w-full h-full items-center justify-center z-[9999] bg-black/15">
            <div className="round-box-border p-6 w-[300px] bg-violet-50 shadow-md">
                <p className="font-ghost text-violet-900 text-2xl mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button className="btn-second text-yellow-500 hover:bg-yellow-50 px-4 py-1" onClick={onCancel}>취소</button>
                    <button className="btn-primary bg-yellow-400 hover:bg-yellow-500 px-4 py-1" onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmGhostModal;