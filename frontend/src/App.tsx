import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateDiscussion from "./pages/CreateDiscussion";
import AppLayout from "./layouts/AppLayout";
import DiscussionDetails from "./components/Discussion/DiscussionDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/thread/create" element={<CreateDiscussion />} />
          <Route path="/thread/:id" element={<DiscussionDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;