import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { CreateNewPlanet } from "./CreateNewPlant";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { planetsSlice } from "../store/slices/slicePlanets";

const mockAddPlanet = jest.fn();
jest.mock("../hooks/usePlanetsAction", () => ({
  __esModule: true,
  default: () => ({
    addPlanet: mockAddPlanet,
  }),
}));

describe("CreateNewPlanet component", () => {
  const store = configureStore({
    reducer: {
      planets: planetsSlice.reducer,
    },
  });

  test("renders form correctly and submits it", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewPlanet />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Name here"), {
      target: { value: "Tatooine" },
    });
    fireEvent.change(screen.getByPlaceholderText("Diameter here"), {
      target: { value: "10465" },
    });
    fireEvent.change(screen.getByPlaceholderText("Terrain here"), {
      target: { value: "Desert" },
    });
    fireEvent.change(screen.getByPlaceholderText("Climate here"), {
      target: { value: "Arid" },
    });
    fireEvent.change(screen.getByPlaceholderText("Residents here"), {
      target: { value: "Luke Skywalker" },
    });

    fireEvent.click(screen.getByText("Create Planet"));

    await waitFor(() => expect(mockAddPlanet).toHaveBeenCalled());
    expect(
      (screen.getByPlaceholderText("Name here") as HTMLInputElement).value
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("Diameter here") as HTMLInputElement).value
    ).toBe("");

    expect(
      (screen.getByPlaceholderText("Terrain here") as HTMLInputElement).value
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("Climate here") as HTMLInputElement).value
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("Residents here") as HTMLInputElement).value
    ).toBe("");
    expect(window.location.pathname).toBe("/");
    expect(screen.getByText("Saved correctly")).toBeDefined();
  });
});
