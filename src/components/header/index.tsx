import { forwardRef } from "react";
import { NavLink } from "react-router";
import "./header.css";

type HeaderProps = object;

const Header = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  return (
    <header className="app-header" ref={ref}>
      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dummy-1"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Page 1
        </NavLink>

        <NavLink
          to="/dummy-2"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Page 2
        </NavLink>

        <NavLink
          to="/dummy-3"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Page 3
        </NavLink>
      </nav>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
