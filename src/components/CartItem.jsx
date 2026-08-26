import { useState, useEffect } from "react"

const CartItem = ({id, title, price, imgUrl, quantity, onUpdateCartItemQuantity, onRemoveCartItem}) => {
    const [quantityInput, setQuantityInput] = useState(quantity);

    useEffect(() => {
        setQuantityInput(quantity);
    }, [quantity]);

    const updateQuantity = () => {
        if(quantityInput === "")
            setQuantityInput(quantity);
        else
            onUpdateCartItemQuantity(id, +quantityInput);
    }

    const handleQuantityInputChange = (e) => {
        if(e.target.value !== "" && (e.target.value < 1 || e.target.value > 100))
            return;
        
        setQuantityInput(e.target.value);
    }

    return (
        <article>
            <img src={imgUrl} alt={title} />
            <h3>{title}</h3>
            <p>{price}</p>
            <button type="button" onClick={() => onRemoveCartItem(id)}>X</button>
            <div>
                <button type="button" onClick={() => onUpdateCartItemQuantity(id, quantity - 1)} disabled={quantityInput === ""}>-</button>
                <input type="number" value={quantityInput} onChange={(e) => handleQuantityInputChange(e)} onBlur={updateQuantity} min={1} max={100}/>
                <button type="button" onClick={() => onUpdateCartItemQuantity(id, quantity + 1)} disabled={quantity >= 100 || quantityInput === ""}>+</button>
            </div>
            <p>{+(price*quantity).toFixed(2)}</p>
        </article>

    )
}

export default CartItem;