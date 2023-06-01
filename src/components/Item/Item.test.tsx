import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Item from "./Item";
import { item as testItem } from "./testData";

describe("Item", () => {
  it("Should render the item", () => {
    render(<Item item={testItem} />, { wrapper: MemoryRouter });

    expect(screen.getByText(testItem.title)).toBeInTheDocument();
  });
});
