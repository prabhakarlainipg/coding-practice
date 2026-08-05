import { createPortal } from "react-dom";

type ModalProps = {
    children: React.ReactNode;
};

export function Modal({ children }: ModalProps) {
    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        return null;
    }

    return createPortal(
        <div className="modal">
            {children}
        </div>,
        modalRoot
    );
}