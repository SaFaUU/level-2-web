import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import user from "@testing-library/user-event";
import { vi } from "vitest";
import FormComponent from "./Form";

describe("FormComponent()", () => {
  it("submit the form correctly with user input", async () => {
    user.setup();

    const submitFn = vi.fn();

    render(<FormComponent onSubmit={submitFn} />);

    const inputEl = screen.getByRole("textbox");

    const text = "Hello World";
    await user.type(inputEl, text);

    const headingEl = screen.getByRole("heading", {
      level: 2,
    });

    expect(headingEl).toHaveTextContent(text);

    // test if submitFN was called
    const submitBtn = screen.getByRole("button", {
      name: "Submit",
    });
    await user.click(submitBtn);
    expect(submitFn).toHaveBeenCalledWith(text);
  });
});
