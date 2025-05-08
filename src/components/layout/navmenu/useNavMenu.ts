// src/components/navmenu/useNavMenu.ts

import { useEffect, useState, useRef } from 'react';

export function useNavMenu() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const submenuTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isMounted) {
      const savedState = localStorage.getItem('navMenuCollapsed');
      if (savedState !== null) setIsCollapsed(savedState === 'true');
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('navMenuCollapsed', String(isCollapsed));
    }
  }, [isCollapsed, isMounted]);

  const toggleSubmenu = (label: string) =>
    setOpenSubmenu((prev) => (prev === label ? null : label));

  const handleMouseEnter = (label: string) => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    setOpenSubmenu(label);
  };

  const handleMouseLeave = () => {
    submenuTimeout.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 300); // Delay para fechar submenu
  };

  return {
    isCollapsed,
    setIsCollapsed,
    openSubmenu,
    toggleSubmenu,
    handleMouseEnter,
    handleMouseLeave,
  };
}
