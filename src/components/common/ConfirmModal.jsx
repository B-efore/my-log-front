import "./ConfirmModal.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <p className="confirm-modal__message">{message}</p>
                <div className="confirm-modal__actions">
                    <button className="confirm-modal__button cancel" onClick={onCancel}>취소</button>
                    <button className="confirm-modal__button confirm" onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;