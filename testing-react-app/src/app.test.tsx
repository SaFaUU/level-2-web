import { render, fireEvent, screen } from "@testing-library/react";
import { it, expect, test } from "vitest";
import App from "./App";

it("Should render hello world correctly", () => {
  render(<App />);

  const element = screen.getByText(/Hello World/i);
  expect(element).toBeInTheDocument();
});
