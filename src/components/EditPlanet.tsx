import { Button, Card, TextInput, Title } from "@tremor/react";
import usePlanetsActions from "../hooks/usePlanetsAction";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/store";
import { Planet } from "../store/slices/slicePlanets";

export function EditPlanet() {
  const { editPlanet } = usePlanetsActions();
  const navigate = useNavigate();

  const { id } = useParams();
  const [planet, setPlanet] = useState<Planet>();
  const planets = useAppSelector((state) => state.planets);
  useEffect(() => {
    const planetToEdit = planets.find((planet) => planet.id === id);
    setPlanet(planetToEdit);
  }, [id, planets]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedPlanet = {
      id: id!,
      name: formData.get("name") as string,
      diameter: formData.get("diameter") as string,
      population: formData.get("population") as string,
      terrain: formData.get("terrain") as string,
      climate: formData.get("climate") as string,
      residents: formData.getAll("residents") as string[],
    };

    editPlanet(updatedPlanet);

    navigate(`/`);
  };
  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ marginTop: "16px" }}>
      <Title>Edit Planet</Title>
      <form onSubmit={handleSubmit} className="">
        <TextInput name="name" defaultValue={planet?.name} />
        <TextInput name="diameter" defaultValue={planet?.diameter} />
        <TextInput name="population" defaultValue={planet?.population} />
        <TextInput name="terrain" defaultValue={planet?.terrain} />
        <TextInput name="climate" defaultValue={planet?.climate} />
        <TextInput
          name="residents"
          defaultValue={planet?.residents.toString()}
        />
        <div className="buttons">
          <Button type="submit" style={{ marginTop: "16px" }}>
            Edit Planet{" "}
          </Button>
          <Link to="/">
            {" "}
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </Link>
        </div>
      </form>
    </Card>
  );
}
