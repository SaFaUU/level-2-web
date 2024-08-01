import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import user from "@testing-library/user-event";
import { vi } from "vitest";
import Counter from "./Counter";
import { Provider } from "react-redux";
import { createStore, store } from "../../redux/store";

describe("Counter()", () => {
  it("Increase the counter value by 1 upon clicking the increment button", async () => {
    user.setup();
    render(
      <Provider store={createStore()}>
        <Counter />
      </Provider>
    );

    const incrementButton = screen.getByText("Increment");
    const countervalueElement = screen.getByText("0");

    await user.click(incrementButton);

    expect(countervalueElement).toHaveTextContent("1");
  });
});
