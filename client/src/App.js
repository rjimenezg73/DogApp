import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
// import Home from "./components/Home.js";
// import CreatedDog from "./components/CreatedDog.js";
// import Detail from "./components/Detail.js";
// import Error404 from "./components/Error404";
// import EditCreatedDog from "./components/EditCreatedDog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        {/* <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<CreatedDog />} />
        <Route path="/dogs/:id" element={<Detail />} />
        <Route path="/dogs/:id/edit" element={<EditCreatedDog />} />
        <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;