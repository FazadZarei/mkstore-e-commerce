import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Login from "../page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock window.alert
const mockAlert = jest.fn();
window.alert = mockAlert;

// Mock window.location
const mockLocation = {
  href: "",
};
Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

describe("Login Page", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    // Clear localStorage before each test
    localStorage.clear();
    // Reset all mocks
    jest.clearAllMocks();
    // Reset window.location
    mockLocation.href = "";
  });

  it("renders login form correctly", () => {
    render(<Login />);

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign up" })).toBeInTheDocument();
  });

  it("redirects to home if user is already logged in", () => {
    // Mock localStorage with user data
    localStorage.setItem("user", JSON.stringify({ name: "Test User" }));

    render(<Login />);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });

  it("handles successful login", async () => {
    const mockUser = { name: "Test User", email: "test@example.com" };

    // Mock successful API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      })
    );

    render(<Login />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    // Check if loading state is shown
    expect(screen.getByText("Signing in...")).toBeInTheDocument();

    await waitFor(() => {
      // Check if API was called with correct data
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5001/api/auth/login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        })
      );

      // Check if user data was stored
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));

      // Check if success message was shown
      expect(mockAlert).toHaveBeenCalledWith("Login successful!");
    });
  });

  it("handles login failure", async () => {
    const errorMessage = "Invalid credentials";

    // Mock failed API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      })
    );

    render(<Login />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      // Check if error message is displayed
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(mockAlert).toHaveBeenCalledWith(errorMessage);
    });
  });

  it("validates required fields", () => {
    render(<Login />);

    // Try to submit without filling the form
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    // Check if form validation prevents submission
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("navigates to signup page", () => {
    render(<Login />);

    const signupLink = screen.getByRole("link", { name: "Sign up" });
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
