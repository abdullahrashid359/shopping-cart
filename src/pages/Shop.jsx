import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../components/ProductCard.jsx";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {addToCartHandler} = useOutletContext();

    useEffect(() => {
        const startFetching = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");


                if(!response.ok)
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

    if(loading)
        return <p>Loading products</p>

    if(error)   
        return <p>{error.message}</p>


    return (
        <main>
            <h2>Find your next favorite piece</h2>

            <section>
                {products.map(product => <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} imgUrl={product.image} onAddToCart={addToCartHandler}/>)}
            </section>
        </main>
    )
}

export default Shop;