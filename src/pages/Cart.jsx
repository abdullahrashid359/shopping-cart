import { useOutletContext, Link } from "react-router";
import CartItem from "../components/CartItem.jsx";

const Cart = () => {
    const { cart, updateCartItemQuantity, removeCartItem } = useOutletContext();

    if (!cart.length)
        return (
            <section>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop">Continue Shopping</Link>
            </section>
        )

    const totalPrice = +cart.reduce((total, curr) => total + curr.price*curr.quantity, 0).toFixed(2);

    return (
        <main>
            <h2>Your cart</h2>

            <div>
                <section>
                    {cart.map(cartItem => <CartItem key={cartItem.id} id={cartItem.id} title={cartItem.title} price={cartItem.price} imgUrl={cartItem.imgUrl} quantity={cartItem.quantity} onUpdateCartItemQuantity={updateCartItemQuantity} onRemoveCartItem={removeCartItem} />)}
                </section>

                <aside>
                    <h3>Order Summary</h3>
                    <div>
                        <p>Items </p>
                        <p>{cart.reduce((total, curr) => total + curr.quantity, 0)}</p>
                    </div>

                    <div>
                        <p>Subtotal </p>
                        <p>{totalPrice}</p>
                    </div>

                    <div>
                        <p>Total</p>
                        <p>{totalPrice}</p>
                    </div>

                    <button type="button">Checkout</button>
                </aside>
            </div>
        </main>
    )
}

export default Cart;