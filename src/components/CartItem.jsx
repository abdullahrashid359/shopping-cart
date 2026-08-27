import { useState, useEffect } from "react"
import styles from "../styles/CartItem.module.css";

const CartItem = ({ id, title, price, imgUrl, quantity, onUpdateCartItemQuantity, onRemoveCartItem }) => {
    const [quantityInput, setQuantityInput] = useState(quantity);

    useEffect(() => {
        setQuantityInput(quantity);
    }, [quantity]);

    const updateQuantity = () => {
        if (quantityInput === "")
            setQuantityInput(quantity);
        else
            onUpdateCartItemQuantity(id, +quantityInput);
    }

    const handleQuantityInputChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setQuantityInput("");
            return;
        }

        const num = Number(value);

        if (num >= 1 && num <= 100)
            setQuantityInput(num);
    };

    return (
        <article className={styles.item}>
            <img className={styles.image} src={imgUrl} alt={title} />

            <div className={styles.details}>
                <h3>{title}</h3>
                <p className={styles.price}>${price.toFixed(2)}</p>

                <div className={styles.quantityControls}>
                    <button type="button" onClick={() => onUpdateCartItemQuantity(id, quantity - 1)} disabled={quantityInput === ""}>-</button>
                    <input type="number" value={quantityInput} onChange={(e) => handleQuantityInputChange(e)} onBlur={updateQuantity} min={1} max={100} />
                    <button type="button" onClick={() => onUpdateCartItemQuantity(id, quantity + 1)} disabled={quantity >= 100 || quantityInput === ""}>+</button>
                </div>
            </div>

            <button
                className={styles.removeButton}
                type="button"
                onClick={() => onRemoveCartItem(id)}
            >
                ×
            </button>

            <p className={styles.itemTotal}>
                ${(price * quantity).toFixed(2)}
            </p>
        </article>
    )
}

export default CartItem;