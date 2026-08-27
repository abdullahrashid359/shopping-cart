import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../src/components/ProductCard.jsx";

const product = {
    id: 1,
    title: "Test Product",
    price: 29.99,
    imgUrl: "test-image.jpg",
};

describe("ProductCard", () => {
    it("calls onAddToCart with the product when Add to cart is clicked", async () => {
        const user = userEvent.setup();
        const onAddToCart = vi.fn();

        render(
            <ProductCard
                {...product}
                onAddToCart={onAddToCart}
            />
        );

        const addButton = screen.getByRole("button", {
            name: /add to cart/i,
        });

        await user.click(addButton);

        expect(onAddToCart).toHaveBeenCalledWith({
            ...product,
            quantity: 1,
        });
    });

    it("increases quantity when the + button is clicked", async () => {
        const user = userEvent.setup();

        render(
            <ProductCard
                {...product}
                onAddToCart={vi.fn()}
            />
        );

        const quantityInput = screen.getByRole("spinbutton");
        const increaseButton = screen.getByRole("button", { name: "+" });

        expect(quantityInput).toHaveValue(1);

        await user.click(increaseButton);

        expect(quantityInput).toHaveValue(2);
    });

    it("decreases quantity when the - button is clicked", async () => {
        const user = userEvent.setup();

        render(
            <ProductCard
                {...product}
                onAddToCart={vi.fn()}
            />
        );

        const quantityInput = screen.getByRole("spinbutton");
        const increaseButton = screen.getByRole("button", { name: "+" });
        const decreaseButton = screen.getByRole("button", { name: "-" });

        await user.click(increaseButton);
        await user.click(increaseButton);

        expect(quantityInput).toHaveValue(3);

        await user.click(decreaseButton);

        expect(quantityInput).toHaveValue(2);
    });

    it("updates quantity when a valid number is entered", async () => {
        const user = userEvent.setup();

        render(
            <ProductCard
                {...product}
                onAddToCart={vi.fn()}
            />
        );

        const quantityInput = screen.getByRole("spinbutton");

        await user.clear(quantityInput);
        await user.type(quantityInput, "5");

        expect(quantityInput).toHaveValue(5);
    });

    it("disables the decrease button when quantity is 1", () => {
        render(
            <ProductCard
                {...product}
                onAddToCart={vi.fn()}
            />
        );

        const decreaseButton = screen.getByRole("button", { name: "-" });

        expect(decreaseButton).toBeDisabled();
    });

    it("disables the increase button when quantity reaches 100", async () => {
        const user = userEvent.setup();

        render(
            <ProductCard
                {...product}
                onAddToCart={vi.fn()}
            />
        );

        const quantityInput = screen.getByRole("spinbutton");
        const increaseButton = screen.getByRole("button", { name: "+" });

        await user.clear(quantityInput);
        await user.type(quantityInput, "100");

        expect(quantityInput).toHaveValue(100);
        expect(increaseButton).toBeDisabled();
    });

    it("shows Added feedback after adding a product", async () => {
        const user = userEvent.setup();

        render(
            <ProductCard
                {...product}
                onAddToCart={vi.fn()}
            />
        );

        const addButton = screen.getByRole("button", {
            name: /add to cart/i,
        });

        await user.click(addButton);

        expect(
            screen.getByRole("button", { name: /added/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /added/i })
        ).toBeDisabled();
    });
});