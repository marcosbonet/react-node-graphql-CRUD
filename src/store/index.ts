import { Middleware, configureStore } from "@reduxjs/toolkit";
import planetReducer from "./slices/slicePlanets";

//TODO: need to end the Middleware syncWithDatabaseMiddleware,
// it is to sync our data from local storage to the database in case this is open source
// import { toast } from "sonner";
//import planetsFetchReducer from "./slices/slicePagination";

const persistantLocalStorageMiddleware: Middleware =
  (store: { getState: () => any }) =>
  (next: (arg0: any) => void) =>
  (action: any) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

// const syncWithDatabaseMiddleware: Middleware =
//   (store: { getState: () => any }) =>
//   (next: (arg0: any) => void) =>
//   (action: any) => {
//     const { type, payload } = action;
//     next(action);
//     if (type === "planets/deletedPlanetById") {
//     }
//     fetch(`https://swapi.dev/api/planets/${payload}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (res.ok) toast.success(`planet ${payload} deleted on database`);
//       })
//       .catch((err) => {
//         console.log("error:", err);
//       });
//   };

export const store = configureStore({
  reducer: {
    planets: planetReducer,
    // planetsFetch: planetsFetchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistantLocalStorageMiddleware
      // syncWithDatabaseMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
