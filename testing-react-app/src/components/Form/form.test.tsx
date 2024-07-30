import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import user from "@testing-library/user-event";
import FormComponent from "./Form";

describe("FormComponent()", () => {
  it("submit the form correctly with user input", async () => {
    user.setup();

    render(
      <FormComponent
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    );

    const inputEl = screen.getByRole("textbox");

    const text = "Hello World";
    await user.type(inputEl, text);

    const headingEl = screen.getByRole("heading", {
      level: 2,
    });

    expect(headingEl).toHaveTextContent(text);
  });
});
