import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCartHandler = (product) => {
      if(cart.some(cartItem => cartItem.id === product.id)) 
        setCart(cart.map(cartItem => {
          if(cartItem.id == product.id)
            return {...cartItem, quantity: cartItem.quantity + product.quantity};
          
          return cartItem;
      }));
      else
        setCart([...cart, product]);
    }

    const updateCartItemQuantity = (id, newQuantity) => {
      if(newQuantity === 0)
        removeCartItem(id);
      else 
        setCart(cart.map(cartItem => {
          if(cartItem.id === id)
            return {...cartItem, quantity: newQuantity};

          return cartItem;
      }))
    }

    const removeCartItem = (id) => {
      setCart(cart.filter(cartItem => cartItem.id !== id));
    }

    const clearCart = () => {
      setCart([]);
    }

    return (
        <div id="app-container">
            <Navbar cart={cart}/>
            <Outlet context={{cart, addToCartHandler, updateCartItemQuantity, removeCartItem,clearCart}}/>
        </div>
    )
}

export default App;