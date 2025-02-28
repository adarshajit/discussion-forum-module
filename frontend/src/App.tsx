import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateThread from "./pages/CreateThread";
import MainLayout from "./components/MainLayout"; // Adjust the path if necessary

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/thread/create" element={<CreateThread />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;