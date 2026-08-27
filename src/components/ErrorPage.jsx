import { Link } from "react-router";
import styles from "../styles/ErrorPage.module.css";

const ErrorPage = () => {
    return (
        <main className={styles.errorPage}>
            <h1>404</h1>
            <h2>Oops! This page doesn't exist.</h2>
            <p>Looks like you've wandered outside Riwaaj.</p>
            <Link className={styles.homeButton} to="/">
                Back to Home
            </Link>
        </main>
    );
};

export default ErrorPage;