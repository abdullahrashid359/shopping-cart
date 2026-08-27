import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "../src/components/CartItem.jsx";

const item = {
    id: 1,
    title: "Test Product",
    price: 20,
    imgUrl: "test-image.jpg",
    quantity: 2,
};

const renderCartItem = (quantity = item.quantity) => {
    const onUpdateCartItemQuantity = vi.fn();
    const onRemoveCartItem = vi.fn();

    render(
        <CartItem
            {...item}
            quantity={quantity}
            onUpdateCartItemQuantity={onUpdateCartItemQuantity}
            onRemoveCartItem={onRemoveCartItem}
        />
    );

    return {
        onUpdateCartItemQuantity,
        onRemoveCartItem,
    };
};

describe("CartItem", () => {
    it("renders the item information", () => {
        renderCartItem();

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$20.00")).toBeInTheDocument();
        expect(screen.getByRole("spinbutton")).toHaveValue(2);
    });

    it("increases quantity when the + button is clicked", async () => {
        const user = userEvent.setup();
        const { onUpdateCartItemQuantity } = renderCartItem();

        await user.click(screen.getByRole("button", { name: "+" }));

        expect(onUpdateCartItemQuantity).toHaveBeenCalledWith(1, 3);
    });

    it("decreases quantity when the - button is clicked", async () => {
        const user = userEvent.setup();
        const { onUpdateCartItemQuantity } = renderCartItem();

        await user.click(screen.getByRole("button", { name: "-" }));

        expect(onUpdateCartItemQuantity).toHaveBeenCalledWith(1, 1);
    });

    it("updates quantity when a valid value is entered", async () => {
        const user = userEvent.setup();
        const { onUpdateCartItemQuantity } = renderCartItem();

        const input = screen.getByRole("spinbutton");

        await user.clear(input);
        await user.type(input, "5");
        await user.tab();

        expect(onUpdateCartItemQuantity).toHaveBeenCalledWith(1, 5);
    });

    it("calls onRemoveCartItem when the remove button is clicked", async () => {
        const user = userEvent.setup();
        const { onRemoveCartItem } = renderCartItem();

        await user.click(screen.getByRole("button", {
            name: "Remove Test Product",
        }));

    expect(onRemoveCartItem).toHaveBeenCalledWith(1);
});

it("disables the increase button when quantity is 100", () => {
    renderCartItem(100);

    expect(
        screen.getByRole("button", { name: "+" })
    ).toBeDisabled();
});

it("disables the decrease button when the input is empty", async () => {
    const user = userEvent.setup();

    renderCartItem();

    const input = screen.getByRole("spinbutton");
    await user.clear(input);

    expect(
        screen.getByRole("button", { name: "-" })
    ).toBeDisabled();

    expect(
        screen.getByRole("button", { name: "+" })
    ).toBeDisabled();
});
});