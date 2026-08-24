import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <main>
            <h1>404</h1>
            <h2>Oops! This page doesn't exist.</h2>
            <p>Looks like you've wandered outside Riwaaj.</p>
            <Link to="/">Back to Home</Link>
        </main>
    )
}

export default ErrorPage;