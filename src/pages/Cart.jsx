import { useOutletContext, Link } from "react-router";
import { useState } from "react";
import CartItem from "../components/CartItem.jsx";
import styles from "../styles/Cart.module.css";

const Cart = () => {
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const { cart, updateCartItemQuantity, removeCartItem, clearCart } = useOutletContext();

    const handleCheckout = () => {
        clearCart();
        setIsCheckedOut(true);
    };

    if (!cart.length)
        return (

            <main className={styles.emptyCart}>
                {isCheckedOut && (
                    <p className={styles.successMessage}>
                        ✓ Order placed successfully!
                    </p>
                )}

                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link className={styles.continueButton} to="/shop">
                    Continue Shopping
                </Link>
            </main>
        );

    const totalPrice = +cart
        .reduce((total, curr) => total + curr.price * curr.quantity, 0)
        .toFixed(2);

    const totalItems = cart.reduce(
        (total, curr) => total + curr.quantity,
        0
    );

    return (
        <main className={styles.cart}>
            <h2>Your cart</h2>

            <div className={styles.cartLayout}>
                <section className={styles.cartItems}>
                    {cart.map(cartItem => (
                        <CartItem
                            key={cartItem.id}
                            id={cartItem.id}
                            title={cartItem.title}
                            price={cartItem.price}
                            imgUrl={cartItem.imgUrl}
                            quantity={cartItem.quantity}
                            onUpdateCartItemQuantity={updateCartItemQuantity}
                            onRemoveCartItem={removeCartItem}
                        />
                    ))}
                </section>

                <aside className={styles.summary}>
                    <h3>Order Summary</h3>

                    <div className={styles.summaryRow}>
                        <p>Items</p>
                        <p>{totalItems}</p>
                    </div>

                    <div className={styles.summaryRow}>
                        <p>Subtotal</p>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>

                    <div className={styles.totalRow}>
                        <p>Total</p>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>

                    <button className={styles.checkoutButton} type="button" onClick={handleCheckout}>
                        Checkout
                    </button>
                </aside>
            </div>
        </main>
    );
};

export default Cart;