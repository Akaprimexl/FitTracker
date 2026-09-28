import { NavLink } from "react-router";
import { Moon, Sun, Dumbbell } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="logo">
          <span className="logo-icon">
            <Dumbbell size={22} />
          </span>

          <span>
            Fit<span>Tracker</span>
          </span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Bu gün
          </NavLink>

          <NavLink
            to="/statistika"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Statistika
          </NavLink>

          <NavLink
            to="/tarixce"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Tarixçə
          </NavLink>
        </nav>

        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          aria-label="Temanı dəyiş"
        >
          {theme === "light" ? (
            <Moon size={19} />
          ) : (
            <Sun size={19} />
          )}
        </button>
      </div>
    </header>
  );
}
