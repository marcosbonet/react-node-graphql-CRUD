import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Planet {
  climate: string;
  diameter: string;
  name: string;
  population: string;
  terrain: string;
  residents: string[];
  id: string;
}

export interface PlanetWithId extends Planet {
  id: string;
}
type PlanetId = string;

const defaultState: Planet[] = [];

const initialState: Planet[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    return JSON.parse(persistedState).planets;
  }
  return defaultState;
})();

export const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async () => {
    const res = await fetch("https://swapi.dev/api/planets/");
    const data = await res.json();
    const planets = await Promise.all(
      data.results.map(async (planet: Planet) => {
        const residentsNames = await Promise.all(
          planet.residents.map(async (residentURL: string) => {
            const residentRes = await fetch(residentURL);
            const residentData = await residentRes.json();
            return residentData.name;
          })
        );
        return { ...planet, residents: residentsNames };
      })
    );
    return planets;
  }
);

export const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    addNewPlanet: (state, action: PayloadAction<Planet>) => {
      const id = crypto.randomUUID();
      state.push({ ...action.payload, id });
    },
    deletePlanetById: (state, action: PayloadAction<PlanetId>) => {
      const id = action.payload;
      const index = state.findIndex((planet) => planet.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editPlanetId: (state, action: PayloadAction<Planet>) => {
      const { id, ...newDetails } = action.payload;
      const planetToUpdate = state.find((planet) => planet.id === id);
      if (planetToUpdate) {
        Object.assign(planetToUpdate, newDetails);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlanets.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default planetsSlice.reducer;
export const { addNewPlanet, deletePlanetById, editPlanetId } =
  planetsSlice.actions;
