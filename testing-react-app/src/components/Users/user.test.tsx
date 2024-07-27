import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Users from "./Users";

it("should render the component", () => {
  render(<Users />);

  const element = screen.getByRole("textbox", {
    name: "name",
  });

  const element2 = screen.getByPlaceholderText("User name");

  const headingElement = screen.getByRole("heading", {
    level: 1,
  });

  expect(element).toBeInTheDocument();
  expect(headingElement).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
});
