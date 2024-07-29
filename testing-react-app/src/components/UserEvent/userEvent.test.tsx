import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import UserEvent from "./UserEvent";

describe("UserEvent()", () => {
  it("renders a counter with initial value of 0", () => {
    render(<UserEvent />);

    const heading = screen.getByRole("heading", {
      level: 3,
    });

    expect(heading).toBeInTheDocument();
  });

  it("should increase the love count", async () => {
    user.setup();
    render(<UserEvent />);

    const increaseButton = screen.getByText("Make her love you more!");
    await user.click(increaseButton);

    const heading = screen.getByRole("heading", {
      level: 3,
    });

    expect(heading).toHaveTextContent("Your girlfriend loves you 1 times!");
  });
});
