import React from "react";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return createPortal(
    <div
      className={cn("fixed inset-0 bg-gray-500/70 invisible z-[999]", {
        visible: isOpen,
      })}
    >
      {children}
    </div>,
    document.querySelector("#portal") as Element
  );
};

export default Modal;
