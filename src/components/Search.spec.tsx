import { render, waitFor } from "@testing-library/react";
import Search from "./Search";

test("renders search input correctly", async () => {
  const handleChange = jest.fn();
  const { getByPlaceholderText } = render(
    <Search search="" onChange={handleChange} />
  );
  await waitFor(() => {
    const searchInput = getByPlaceholderText("Search Planet");
    expect(searchInput).toBeTruthy();
  });
});
