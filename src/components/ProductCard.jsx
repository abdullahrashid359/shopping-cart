import { useState } from "react";

const ProductCard = ({id, title, price, imgUrl, onAddToCart}) => {
    const [quantity, setQuantity] = useState(1);
    
    const handleQuantityChange = (e) => {
        if(e.target.value === "") {
            setQuantity("");
            return;
        }

        const num = +e.target.value;

        if(num >= 1 && num <= 100)
            setQuantity(num);
    }

    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1);
    }

    const handleDecreaseQuantity = () => {
        setQuantity(prev => prev - 1);
    }

    return (
        <article>
            <img src={imgUrl} alt={title} />
            <h3>{title}</h3>
            <p>{price}</p>
            <div>
                <button type="button" onClick={handleDecreaseQuantity} disabled={quantity <= 1 || quantity === ""}>-</button>
                <input type="number" value={quantity} onChange={handleQuantityChange} min={1} max={100}/>
                <button type="button" onClick={handleIncreaseQuantity} disabled={quantity >= 100 || quantity === ""}>+</button>
            </div>
            <button type="button" onClick={() => onAddToCart({id, title, price, imgUrl, quantity})} disabled={quantity === ""}>Add to cart</button>
        </article>
    )
};

export default ProductCard;