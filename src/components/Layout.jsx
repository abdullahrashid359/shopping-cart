import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";

const Layout = () => {
    return (
        <div id="app-containe">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout;