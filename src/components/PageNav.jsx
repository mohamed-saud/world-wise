import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
function PageNav() {
  const { isAuthantcated, logOut } = useContext(AuthContext);
  function handelClick(e) {
    e.preventDefault();
    logOut();
  }
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={styles.nav.ul}>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          {isAuthantcated ? (
            <NavLink
              onClick={(e) => handelClick(e)}
              to="/"
              className={styles.ctaLink}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
