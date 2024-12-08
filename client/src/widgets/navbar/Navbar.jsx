import { Link } from "react-router-dom";
import { useLogoutUser } from "../../features/auth/hooks/useSessions";
import { useToggleMobileMenu } from "./hooks/useToggleMobileMenu";
import { Button } from "@/shared/ui/Button";
export const Navbar = () => {
  const { mobileMenuOpen, toggleMenu, closeMenu } = useToggleMobileMenu();
  const logout = useLogoutUser();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <nav className="bg-gray-800 text-white p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Card Game</div>

        <ul className="hidden md:flex space-x-4 gap-10 justify-center items-center">
          <li>
            <Link
              to="/home"
              className="hover:text-blue-400 transition duration-200"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/battle"
              className="hover:text-blue-400 transition duration-200"
            >
              Battle Modes
            </Link>
          </li>
          <li>
            <Link
              to="/pokedex"
              className="hover:text-blue-400 transition duration-200"
            >
              Pokedex
            </Link>
          </li>
        </ul>

        <Button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          label={
            mobileMenuOpen ? (
              <span className="text-2xl">✖</span>
            ) : (
              <span className="text-2xl">☰</span>
            )
          }
        />

        <div className="hidden md:block">
          <Button
            className="hover:text-red-400 transition duration-200"
            onClick={handleLogout}
            label="Logout"
          />
        </div>
      </div>

      {mobileMenuOpen && (
        <ul className="md:hidden bg-gray-700 text-white p-3 space-y-2">
          <li>
            <Link
              to="/home"
              className="block hover:text-blue-400 transition duration-200"
              onClick={toggleMenu}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/battle"
              className="block hover:text-blue-400 transition duration-200"
              onClick={closeMenu}
            >
              Battle Modes
            </Link>
          </li>
          <li>
            <Link
              to="/pokedex"
              className="block hover:text-blue-400 transition duration-200"
              onClick={closeMenu}
            >
              Pokedex
            </Link>
          </li>
          <li>
            <Button
              className="hover:text-red-400 transition duration-200"
              onClick={handleLogout}
              label="Logout"
            />
          </li>
        </ul>
      )}
    </nav>
  );
};
