import { Link } from "react-router";

const Home = () => {
    return (
        <main>
            <section>
                <h2>Style your everyday, your way.</h2>
                <p>Discover clothing, accessories, and everyday essentials curated to bring a little more character to your wardrobe and lifestyle.</p>
                <Link to="/shop">Shop Now</Link>
            </section>

            <section>
                <h2>Why Riwaaj?</h2>
                <p>From timeless clothing to everyday accessories, discover pieces that balance comfort, style, and simplicity.</p>
            </section>
        </main>
    )
}

export default Home;