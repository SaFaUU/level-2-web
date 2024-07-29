import { render, screen, within } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import UserTable from "./UsersTable";
import { users } from "../../App";

beforeEach(() => {
  render(<UserTable users={users} />);
});

describe("UserTable()", () => {
  it("Should render the welcome message after 5ms", async () => {
    const welcomeMessageEl = await screen.findByTestId(
      "welcome",
      {},
      {
        timeout: 2000,
      }
    );
    expect(welcomeMessageEl).toBeInTheDocument();
  });

  it("should render testing playground", () => {
    // screen.logTestingPlaygroundURL();
  });

  it("count the rows", () => {
    const rows = within(screen.getByTestId("users")).getAllByRole("row");
    expect(rows).toHaveLength(3);
  });
});
