import "./App.css";
import ListOfPlanet from "./components/ListOfPlanet";
import { CreateNewPlanet } from "./components/CreateNewPlant";
import { Toaster } from "sonner";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { EditPlanet } from "./components/EditPlanet";
import { Residents } from "./components/Residents";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <Link to={"/"}></Link>
        </div>
        <Routes>
          <Route path="/" element={<ListOfPlanet />}></Route>
          <Route path="/add" element={<CreateNewPlanet />}></Route>
          <Route path="/edit/:code" element={<EditPlanet />}></Route>
          <Route path="/residents/:id" element={<Residents />}></Route>
        </Routes>
        <Toaster richColors />
      </BrowserRouter>
    </div>
  );
}
export default App;
