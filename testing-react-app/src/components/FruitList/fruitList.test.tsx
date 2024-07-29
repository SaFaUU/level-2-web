import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import FruitList from "./FruitList";

const fruits = ["apple", "banana", "orange", "mango", "pineapple"];

describe("FruitList()", () => {
  it("should render the component", () => {
    render(<FruitList fruits={fruits} />);

    // get by text
    const element = screen.getByText("Fruit List");
    expect(element).toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(fruits.length);
  });
});
