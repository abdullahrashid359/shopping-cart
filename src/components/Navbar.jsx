import { NavLink } from "react-router";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ cart }) => {
    const totalItems = cart.reduce(
        (total, cartItem) => total + cartItem.quantity, 0);

    const getNavLinkClass = ({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.active : ""}`;

    return (
        <header className={styles.navbar}>
            <h1 className={styles.logo}>
                <NavLink to="/" end>
                    Riwaaj
                </NavLink>
            </h1>

            <nav>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink to="/" end className={getNavLinkClass}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/shop" className={getNavLinkClass}>
                            Shop
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/cart" className={getNavLinkClass}>
                            Cart {totalItems > 0 && (
                                <span className={styles.cartCount}>
                                    {totalItems}
                                </span>
                            )}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;