import { useEffect, useState } from "react";
import reactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "@/styles/Modal.module.css";

export default function Modal({ show, onClose, title, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  });

  const handleClose = (event) => {
    event.preventDefault();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={handleClose}>
          <AiOutlineClose />
        </button>
      </div>
      {title && <div>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  ) : null;

  if (isBrowser) {
    return reactDom.createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
}
