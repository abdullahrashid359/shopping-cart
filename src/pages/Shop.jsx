import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../components/ProductCard.jsx";
import styles from "../styles/Shop.module.css";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCartHandler } = useOutletContext();

    useEffect(() => {
        const startFetching = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");


                if (!response.ok)
                    throw new Error("Failed to load products. Please try again.");

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        startFetching();
    }, []);

    if (loading)
        return <p className={styles.status}>Loading products...</p>;

    if (error)
        return <p className={styles.error}>{error.message}</p>;

    return (
        <main className={styles.shop}>
            <h2 className={styles.heading}>Find your next favorite piece</h2>

            <section className={styles.productGrid}>
                {products.map(product => <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} imgUrl={product.image} onAddToCart={addToCartHandler} />)}
            </section>
        </main>
    )
}

export default Shop;