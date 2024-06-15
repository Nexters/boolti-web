import { useEffect, useRef, useState } from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutSide);

    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleClickOutSide = (e: Event) => {
    const current = dropdownRef.current;
    if (isOpen && current && !current.contains(e.target as Node)) setIsOpen(false);
  };

  return {
    isOpen,
    dropdownRef,
    toggleDropdown,
  };
};

export default useDropdown;
