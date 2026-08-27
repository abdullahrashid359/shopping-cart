import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import Cart from "../src/pages/Cart.jsx";

const cart = [
    {
        id: 1,
        title: "Test Product",
        price: 20,
        imgUrl: "test-image.jpg",
        quantity: 2,
    },
    {
        id: 2,
        title: "Another Product",
        price: 15,
        imgUrl: "another-image.jpg",
        quantity: 1,
    },
];

const renderCart = (initialCart = cart) => {
    const updateCartItemQuantity = vi.fn();
    const removeCartItem = vi.fn();

    const TestLayout = () => {
        const [cartItems, setCartItems] = useState(initialCart);

        const clearCart = () => {
            setCartItems([]);
        };

        return (
            <Outlet
                context={{
                    cart: cartItems,
                    updateCartItemQuantity,
                    removeCartItem,
                    clearCart,
                }}
            />
        );
    };

    render(
        <MemoryRouter initialEntries={["/cart"]}>
            <Routes>
                <Route element={<TestLayout />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );

    return {
        updateCartItemQuantity,
        removeCartItem,
    };
};

describe("Cart", () => {
    it("renders cart items", () => {
        renderCart();

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("Another Product")).toBeInTheDocument();
    });

    it("displays the correct total number of items", () => {
        renderCart();

        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("calculates and displays the correct total", () => {
        renderCart();

        expect(screen.getAllByText("$55.00")).toHaveLength(2);
    });

    it("calls updateCartItemQuantity when a cart item's quantity is changed", async () => {
        const user = userEvent.setup();
        const { updateCartItemQuantity } = renderCart();

        const increaseButtons = screen.getAllByRole("button", {
            name: "+",
        });

        await user.click(increaseButtons[0]);

        expect(updateCartItemQuantity).toHaveBeenCalledWith(1, 3);
    });

    it("calls removeCartItem when a cart item is removed", async () => {
        const user = userEvent.setup();
        const { removeCartItem } = renderCart();

        const removeButton = screen.getByRole("button", {
            name: "Remove Test Product",
        });

        await user.click(removeButton);

        expect(removeCartItem).toHaveBeenCalledWith(1);
    });

    it("clears the cart after checkout", async () => {
        const user = userEvent.setup();

        renderCart();

        await user.click(
            screen.getByRole("button", { name: /checkout/i })
        );

        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("displays the empty cart message when the cart is empty", () => {
        renderCart([]);

        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

        expect(
            screen.getByText(
                "Looks like you haven't added anything to your cart yet."
            )
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /continue shopping/i })
        ).toBeInTheDocument();
    });

    it("shows a success message after checkout", async () => {
        const user = userEvent.setup();

        renderCart();

        await user.click(
            screen.getByRole("button", { name: /checkout/i })
        );

        expect(
            screen.getByText("✓ Order placed successfully!")
        ).toBeInTheDocument();
    });
});