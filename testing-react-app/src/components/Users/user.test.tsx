import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Users from "./Users";

it("should render the component", () => {
  render(<Users />);

  // const element = screen.getByRole("textbox", {
  //   name: "name",
  // });

  const element2 = screen.getByPlaceholderText("User name");

  const headingElement = screen.getByRole("heading", {
    level: 1,
  });

  // expect(element).toBeInTheDocument();
  expect(headingElement).toBeInTheDocument();
  expect(element2).toBeInTheDocument();

  // getbytext
  const element3 = screen.getByText("Enter the form data");
  expect(element3).toBeInTheDocument();

  // get by label text
  const element4 = screen.getByLabelText("Name", {
    selector: "input",
  });
  expect(element4).toBeInTheDocument();

  // get by alt text
  const element5 = screen.getByAltText("person");
  expect(element5).toBeInTheDocument();

  // get by title
  const element6 = screen.getByTitle("open");
  expect(element6).toBeInTheDocument();

  // get by display value
  const element7 = screen.getByDisplayValue("ph");
  expect(element7).toBeInTheDocument();

  // get by test id
  const element8 = screen.getByTestId("paragraph");
  expect(element8).toBeInTheDocument();

  // To get a hidden element but not throw an error as well
  const button = screen.queryByRole("button", {
    name: "Submit",
  });

  expect(button).not.toBeInTheDocument();
});
