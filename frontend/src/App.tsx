import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DiscussionCreation from "./pages/DiscussionCreation";
import AppLayout from "./layouts/AppLayout";
import DiscussionDetails from "./pages/DiscussionDetails";
import PageNotfound from "./pages/PageNotfound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/thread/create" element={<DiscussionCreation />} />
          <Route path="/thread/:id" element={<DiscussionDetails />} />
          <Route path="*" element={<PageNotfound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;