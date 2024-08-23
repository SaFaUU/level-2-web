import React, { MouseEvent, ReactNode, useRef } from "react";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";

type TModalContext = {
  onClose: () => void;
};

type TClose = {
  children?: ReactNode;
};

type THeader = {
  children: ReactNode;
};

const ModalContext = React.createContext<TModalContext | null>(null);

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClose = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div
        className={cn(
          "fixed inset-0 flex justify-center items-center bg-gray-500/70 invisible z-[999]",
          {
            visible: isOpen,
          }
        )}
        onClick={handleOutsideClose}
      >
        <div className="w-full max-w-2xl mx-auto bg-white p-2 rounded">
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.querySelector("#portal") as Element
  );
};

const CloseButton = ({ children }: TClose) => {
  const { onClose } = React.useContext(ModalContext) as TModalContext;

  return (
    <button className="ml-auto" onClick={onClose}>
      {children ? (
        children
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6 bg-red-500 rounded"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
};

const Header = ({ children }: THeader) => {
  return <div className="flex justify-between w-full mb-3">{children}</div>;
};

Modal.Header = Header;
Modal.CloseButton = CloseButton;

export default Modal;
