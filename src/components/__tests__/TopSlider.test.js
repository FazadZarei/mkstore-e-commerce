import { render, screen } from "@testing-library/react";
import TopSlider from "../TopSlider";

// Mock react-fast-marquee
jest.mock("react-fast-marquee", () => {
  return function MockMarquee({ children }) {
    return <div data-testid="mock-marquee">{children}</div>;
  };
});

describe("TopSlider", () => {
  it("renders all messages", () => {
    render(<TopSlider />);

    // Check if all messages are rendered
    const shippingMessages = screen.getAllByText(
      "FREE UK SHIPPING ON ORDERS OVER £150"
    );
    expect(shippingMessages.length).toBeGreaterThan(0);
    expect(screen.getByText("SUPERWEIGHT RESTOCK OUT NOW")).toBeInTheDocument();
    expect(
      screen.getByText("ORDER BEFORE 2PM FOR NEXT DAY UK DELIVERY")
    ).toBeInTheDocument();
    expect(screen.getByText("DOWNLOAD THE MKI APP")).toBeInTheDocument();
  });

  it("renders the marquee component", () => {
    render(<TopSlider />);
    expect(screen.getByTestId("mock-marquee")).toBeInTheDocument();
  });

  it("renders messages with correct styling", () => {
    render(<TopSlider />);
    const messages = screen.getAllByText(
      /FREE UK SHIPPING|SUPERWEIGHT|ORDER BEFORE|DOWNLOAD THE MKI APP/
    );

    messages.forEach((message) => {
      expect(message).toHaveClass("text-xs", "text-white", "bg-black");
    });
  });
});
