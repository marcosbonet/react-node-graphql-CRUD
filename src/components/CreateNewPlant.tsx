import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import usePlanetsActions from "../hooks/usePlanetsAction";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function CreateNewPlanet() {
  const navigate = useNavigate();
  const { addPlanet } = usePlanetsActions();
  const [result, setResult] = useState<"ok" | "ko" | null>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const diameter = formData.get("diameter") as string;
    const population = formData.get("population") as string;
    const terrain = formData.get("terrain") as string;
    const climate = formData.get("climate") as string;
    const residents = formData.getAll("residents") as string[];
    const id = uuidv4();

    addPlanet({
      name,
      diameter,
      population,
      terrain,
      climate,
      residents,
      id,
    });

    if (!name) {
      return setResult("ko");
    }
    setResult("ok");
    form.reset();
    navigate("/");
  };
  return (
    <Card style={{ marginTop: "16px" }}>
      <Title>Create New Planet</Title>
      <form onSubmit={handleSubmit} className="">
        <TextInput name="name" placeholder="Name here" />
        <TextInput name="diameter" placeholder="Diameter here" />
        <TextInput name="population" placeholder="Pupulation here" />
        <TextInput name="terrain" placeholder="Terrain here" />
        <TextInput name="climate" placeholder="Climate here" />
        <TextInput name="residents" placeholder="Residents here" />

        <div className="buttons">
          <Button type="submit" style={{ marginTop: "16px" }}>
            Create Planet{" "}
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
          <span>
            {result === "ok" && <Badge color="green"> Saved correctly</Badge>}
            {result === "ko" && <Badge color="red"> Mistake on filds</Badge>}
          </span>
        </div>
      </form>
    </Card>
  );
}
