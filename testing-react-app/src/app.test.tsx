import { render, fireEvent, screen } from "@testing-library/react";
import { it, expect, test } from "vitest";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

it("Should render hello world correctly", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const element = screen.getByText("Hello World");
  expect(element).toBeInTheDocument();
});
