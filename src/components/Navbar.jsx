import { Link } from "react-router"

const Navbar = () => {
    return (
        <header>
            <h1><Link to="/">Riwaaj</Link></h1>

            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;