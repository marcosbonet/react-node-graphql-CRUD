import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import styled from "styled-components";

const ResidentsContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ResidentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResidentItem = styled.li`
  padding: 5px 0;
`;

export function Residents() {
  const planets = useAppSelector((state) => state.planets);
  const { planetId } = useParams<{ planetId: string }>();

  const planet = planets.find((planet) => planet.id === planetId);

  if (!planet) {
    return <div>No planet found with ID {planetId}</div>;
  }

  const { name, residents } = planet;

  return (
    <ResidentsContainer>
      <div className="residents-button">
        <h1>Residents of Planet: {name}</h1>
        <Link to="/">
          <div className="button-back">
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </div>
        </Link>
      </div>
      <ResidentList>
        {residents.map((resident, index) => (
          <ResidentItem key={index}>{resident} </ResidentItem>
        ))}
      </ResidentList>
    </ResidentsContainer>
  );
}

export default Residents;
