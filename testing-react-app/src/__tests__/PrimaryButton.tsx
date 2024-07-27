import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import PrimaryButton from "../components/PrimaryButton";

describe("PrimaryButton", () => {
  it("should render correctly", () => {
    render(<PrimaryButton />);
    const element = screen.getByText(/Click to Add/i);
    expect(element).toBeInTheDocument();
  });

  it("should render correctly with the action type provided", () => {
    const actionType = "Delete";
    render(<PrimaryButton actionType={actionType} />);
    const element = screen.getByText("Click to " + actionType);
    expect(element).toBeInTheDocument();
  });
});
