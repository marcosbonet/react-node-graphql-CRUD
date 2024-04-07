import {
  addNewPlanet,
  deletePlanetById,
  editPlanetId,
  Planet,
} from "../store/slices/slicePlanets";
import { useAppDispatch } from "./store";

export const usePlanetsActions = () => {
  const dispatch = useAppDispatch();

  const addPlanet = (planet: Planet) => {
    dispatch(addNewPlanet(planet));
  };

  const removePlanet = (id: string) => {
    dispatch(deletePlanetById(id));
  };
  const editPlanet = (planet: Planet) => {
    dispatch(editPlanetId(planet));
  };
  return { removePlanet, addPlanet, editPlanet };
};

export default usePlanetsActions;
