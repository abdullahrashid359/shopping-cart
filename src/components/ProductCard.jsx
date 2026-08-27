import { useState } from "react";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ id, title, price, imgUrl, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleQuantityChange = (e) => {
        if (e.target.value === "") {
            setQuantity("");
            return;
        }

        const num = +e.target.value;

        if (num >= 1 && num <= 100)
            setQuantity(num);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prev => prev - 1);
    };

    const handleAddToCart = () => {
        onAddToCart({
            id,
            title,
            price,
            imgUrl,
            quantity
        });

        setIsAdded(true);
        setQuantity(1);
        setTimeout(() => setIsAdded(false), 1500);
    }

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={imgUrl} alt={title} />
            </div>

            <div className={styles.content}>
                <h3>{title}</h3>
                <p className={styles.price}>${price.toFixed(2)}</p>

                <div className={styles.quantityControls}>
                    <button
                        type="button"
                        onClick={handleDecreaseQuantity}
                        disabled={quantity <= 1 || quantity === ""}
                    >
                        -
                    </button>

                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min={1}
                        max={100}
                    />

                    <button
                        type="button"
                        onClick={handleIncreaseQuantity}
                        disabled={quantity >= 100 || quantity === ""}
                    >
                        +
                    </button>
                </div>

                <button
                    className={styles.addButton}
                    type="button"
                    onClick={handleAddToCart}
                    disabled={quantity === "" || isAdded}
                >
                   {isAdded ? "✓ Added!" : "Add to cart"}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;