import { Link } from "react-router";
import styles from "../styles/Home.module.css";

const Home = () => {
    return (
        <main className={styles.home}>
            <section className={styles.hero}>
                <h2>Style your everyday, your way.</h2>
                <p>
                    Discover clothing, accessories, and everyday essentials
                    curated to bring a little more character to your wardrobe
                    and lifestyle.
                </p>
                <Link className={styles.shopButton} to="/shop">
                    Shop Now
                </Link>
            </section>

            <section className={styles.whyRiwaaj}>
                <h2>Why Riwaaj?</h2>

                <div className={styles.features}>
                    <article>
                        <h3>Simple & Timeless</h3>
                        <p>
                            Pieces designed to fit effortlessly into your
                            everyday wardrobe.
                        </p>
                    </article>

                    <article>
                        <h3>Comfort First</h3>
                        <p>
                            Everyday essentials that keep you comfortable
                            without compromising on style.
                        </p>
                    </article>

                    <article>
                        <h3>Made for You</h3>
                        <p>
                            A curated collection to help you express your own
                            sense of style.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default Home;