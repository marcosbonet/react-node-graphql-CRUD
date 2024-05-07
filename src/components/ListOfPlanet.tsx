import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import usePlanetsActions from "../hooks/usePlanetsAction";
import { useEffect, useState } from "react";
import { Planet, fetchPlanets } from "../store/slices/slicePlanets";
import Search from "./Search";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export function ListOfPlanet() {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const planets = useAppSelector((state) => state.planets);
  useEffect(() => {
    dispatch(fetchPlanets());
  }, []);

  const { removePlanet } = usePlanetsActions();
  const { editPlanet } = usePlanetsActions();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleEditPlanet = (editedPlanet: Planet) => {
    editPlanet(editedPlanet);
  };
  const filteredPlanets =
    search.length === 0
      ? planets
      : planets
          .filter((planet) => {
            return planet.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase());
          })
          .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Card>
      <div className="card-header">
        <img src={logo} alt="Logo" className="w-24 h-24" />
        <Search search={search} onChange={handleSearch} />
        <Link to={"/add"} className="btn btn-success">
          <div className="button-plus">
            Add planet
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </Link>
      </div>
      <Table className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Diameter</TableHeaderCell>
            <TableHeaderCell>Climate</TableHeaderCell>
            <TableHeaderCell>Population</TableHeaderCell>
            <TableHeaderCell>Terrain</TableHeaderCell>
            <TableHeaderCell>Residents</TableHeaderCell>
            <TableHeaderCell>Accions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPlanets.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.diameter}</TableCell>
              <TableCell>{item.climate}</TableCell>
              <TableCell>{item.population}</TableCell>
              <TableCell>{item.terrain}</TableCell>
              <Link to={`/residents/${item.id}`}>
                <div className="button-view">
                  View Residents
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
              </Link>
              <TableCell>
                <Link to={`/edit/${item.id}`}>
                  <button onClick={() => handleEditPlanet(item)} type="button">
                    <svg
                      aria-label="Remove element"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                </Link>
                <button onClick={() => removePlanet(item.id)} type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
export default ListOfPlanet;
