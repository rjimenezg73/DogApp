import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import CreatedDog from "./components/CreateDogs.jsx";
import Detail from "./components/Detail.jsx";
import Error404 from "./components/Error404.jsx";
import EditCreatedDog from "./components/EditCreatedDog.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<LandingPage />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/dogs/:id" element={<Detail />} />
        <Route path="/dogs" element={<CreatedDog />} />
        {/* <Route path="/dogs/:id/edit" element={<EditCreatedDog />} />
        <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;