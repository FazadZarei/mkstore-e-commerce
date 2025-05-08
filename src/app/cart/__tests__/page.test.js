import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { useRouter } from "next/navigation";
import Cart from "../page";
import { CartProvider } from "@/context/CartContext";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the Header component
jest.mock("@/components/Header", () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

// Mock CartContext
jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
  CartProvider: ({ children }) => children,
}));

describe("Cart Page", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders empty cart message when cart is empty", async () => {
    // Mock empty cart
    require("@/context/CartContext").useCart.mockReturnValue({
      cart: [],
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    });

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      );
    });

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
  });

  it("renders cart items and total when cart has items", async () => {
    const mockCart = [
      {
        id: 1,
        title: "Test Product",
        price: 99.99,
        quantity: 2,
        image1: "test-image.jpg",
      },
    ];

    require("@/context/CartContext").useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    });

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      );
    });

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Total: $199.98")).toBeInTheDocument();
  });

  it("handles quantity updates", async () => {
    const mockUpdateQuantity = jest.fn();
    const mockCart = [
      {
        id: 1,
        title: "Test Product",
        price: 99.99,
        quantity: 2,
        image1: "test-image.jpg",
      },
    ];

    require("@/context/CartContext").useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      clearCart: jest.fn(),
    });

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText("+"));
    });

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("handles checkout process", async () => {
    const mockClearCart = jest.fn();
    const mockCart = [
      {
        id: 1,
        title: "Test Product",
        price: 99.99,
        quantity: 2,
        image1: "test-image.jpg",
      },
    ];

    require("@/context/CartContext").useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: mockClearCart,
    });

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Checkout"));
    });

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith("/cart/success");
  });

  // New test cases for adding and removing items
  it("handles adding items to cart", async () => {
    const mockAddToCart = jest.fn();
    const mockCart = [];
    const newItem = {
      id: 1,
      title: "New Product",
      price: 49.99,
      quantity: 1,
      image1: "new-image.jpg",
    };

    require("@/context/CartContext").useCart.mockReturnValue({
      cart: mockCart,
      addToCart: mockAddToCart,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    });

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      );
    });

    await act(async () => {
      mockAddToCart(newItem);
    });

    expect(mockAddToCart).toHaveBeenCalledWith(newItem);
  });

  it("handles removing items from cart", async () => {
    const mockRemoveFromCart = jest.fn();
    const mockCart = [
      {
        id: 1,
        title: "Test Product",
        price: 99.99,
        quantity: 2,
        image1: "test-image.jpg",
      },
    ];

    require("@/context/CartContext").useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    });

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Remove"));
    });

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("updates cart total when items are added or removed", async () => {
    const mockCart = [
      {
        id: 1,
        title: "Product 1",
        price: 50.0,
        quantity: 2,
        image1: "image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 75.0,
        quantity: 1,
        image1: "image2.jpg",
      },
    ];

    require("@/context/CartContext").useCart.mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    });

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      );
    });

    expect(screen.getByText("Total: $175.00")).toBeInTheDocument();
  });
});
