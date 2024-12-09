import { useState } from "react";

export const useToggleMobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  const closeMenu = () => setMobileMenuOpen(false);

  return { mobileMenuOpen, toggleMenu, closeMenu };
};
