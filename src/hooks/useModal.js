import { useState, useEffect, useRef } from 'react';

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalWrapperRef = useRef(null);
  const forDisableFocusRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
      forDisableFocusRef.current.inert = true;
    } else {
      document.body.style.overflowY = '';
      forDisableFocusRef.current.inert = false;
    }
  }, [isModalOpen]);

  useEffect(() => {
    const wrapperClickHandler = (event) => {
      if (event.target === modalWrapperRef.current) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('click', wrapperClickHandler);

    return () => {
      window.removeEventListener('click', wrapperClickHandler);
    };
  }, [modalWrapperRef]);

  return [isModalOpen, setIsModalOpen, modalWrapperRef, forDisableFocusRef];
};
